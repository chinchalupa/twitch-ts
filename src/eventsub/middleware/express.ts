import { type RequestHandler } from 'express'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { type EventSub } from '../eventsub'

const TwitchHeaders = [
    'twitch-eventsub-message-id',
    'twitch-eventsub-message-timestamp',
    'twitch-eventsub-message-signature',
    'twitch-eventsub-message-type',
] as const

const HASH_ALGORITHM = 'sha256' as const

enum MessageType {
    Notification = 'notification',
    Revocation = 'revocation',
    WebhookCallbackVerification = 'webhook_callback_verification',
}

/**
 * Validates requests from Twitch EventSub. A secret must be provided to
 * validate all requests.
 * @param eventsub The eventsub object that handles events.
 * @param secret Value used to authenticate the message contents. Must be
 * between 10 and 100 characters.
 */
export function getEventSubExpressMiddleware(
    secret: string,
    eventsub: EventSub,
): RequestHandler {
    if (secret.length < 10 || secret.length > 100) {
        throw new Error('Twitch EventSub validation middleware secret must be between 10 and 100 characters.')
    }

    const handler: RequestHandler = ({body, headers}, res) => {
        const headerBuffers: string[] = []
        for (const key of TwitchHeaders) {
            const header = headers[key]
            if (undefined === header || Array.isArray(header)) {
                console.warn('EventSub middleware received missing or invalid header:', key)
                res.status(403).send('Forbidden.')
                return
            }
            headerBuffers.push(header)
        }

        const [id, timestamp, signature, type] = headerBuffers

        const hashedMessage = createHmac(HASH_ALGORITHM, secret)
            .update(id + timestamp + body)
            .digest('hex')
        const hashedMessageBuffer = `${HASH_ALGORITHM}=${hashedMessage}`

        try {
            if (true !== timingSafeEqual(Buffer.from(hashedMessageBuffer), Buffer.from(signature))) {
                console.warn('EventSub middleware received request with an invalid signature.')
                res.status(403).send('Forbidden.')
                return
            }
        } catch (e) {
            res.sendStatus(403)
            return
        }

        switch (type) {
            case MessageType.WebhookCallbackVerification: {
                const verificationData = JSON.parse(body)
                res.status(200).send(verificationData.challenge)
                break
            }
            case MessageType.Notification: {
                const notificationData = JSON.parse(body)
                eventsub.emitNotification(notificationData)
                res.sendStatus(204)
                break
            }
            case MessageType.Revocation: {
                const revocationData = JSON.parse(body)
                eventsub.emitRevocation(revocationData)
                res.sendStatus(204)
                break
            }
            default: {
                console.error('EventSub middleware received invalid message type:', type)
                res.status(403).send('Forbidden.')
                return
            }
        }
    }

    return handler
}
