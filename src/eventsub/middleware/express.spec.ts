import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals'
import { createHmac, randomBytes } from 'node:crypto'
import express from 'express'
import { getEventSubExpressMiddleware } from './express'
import { EventsubClient } from '../eventsub'

describe('express middleware', () => {
    test.each([1, 101])('should throw an error if the secret is an invalid size', (secret) => {
        expect(() => getEventSubExpressMiddleware(
            randomBytes(secret).toString('hex'),
            new EventsubClient(),
        )).toThrowError()
    })

    describe('valid middleware', () => {
        const port = 8001
        const addr = 'http://localhost'
        const url = new URL(`${addr}:${port}`)
        const validTestSecret = randomBytes(20).toString('hex')
        const client = new EventsubClient()

        let app: ReturnType<typeof express>
        let server: ReturnType<typeof app.listen>

        beforeAll(async () => {
            app = express()

            app.use(express.raw({ type: 'application/json' }))
            app.use(getEventSubExpressMiddleware(validTestSecret, client))
            // Ensure the server is initialized before continuing.
            await new Promise<void>((resolve) => {
                server = app.listen(port, resolve)
            })
        })

        afterAll(async () => server.close())

        const validNotificationHeaders: Record<string, string> = {
            'twitch-eventsub-message-id': randomBytes(8).toString('hex'),
            'twitch-eventsub-message-timestamp': 'timestamp',
            'twitch-eventsub-message-signature': 'REPLACE_ME_BASED_ON_DATA',
            'twitch-eventsub-message-type': 'notification',
        } as const

        test.each(Object.keys(validNotificationHeaders))('should return 403 if the %s header is not present in the request headers', async (header) => {
            const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {})

            // Omit the tested header.
            const { [header]: _, ...incompleteHeaders } = validNotificationHeaders

            await expect(fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...incompleteHeaders,
                },
                body: JSON.stringify({}),
            })).resolves.toHaveProperty('status', 403)

            expect(consoleWarnMock).toHaveBeenCalledTimes(1)
            expect(consoleWarnMock).toHaveBeenCalledWith('EventSub middleware received missing or invalid header:', header)
        })
        test('should return 403 if the request signature is invalid', async () => {
            const body = JSON.stringify({subscription: { type: 'channel.follow' }, event: {}})
            await expect(fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...validNotificationHeaders,
                    'twitch-eventsub-message-signature': 'invalid',
                },
                body,
            })).resolves.toHaveProperty('status', 403)
        })
        test('should return 403 if the request signature does not match the generated signature', async () => {
            const signature = createHmac('sha256', validTestSecret).update('invalid').digest('hex')

            await expect(fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...validNotificationHeaders,
                    'twitch-eventsub-message-signature': `sha256=${signature}`,
                },
                body: JSON.stringify({subscription: { type: 'channel.follow' }, event: {}}),
            })).resolves.toHaveProperty('status', 403)
        })
        describe('webhook_callback_verification message type', () => {
            test('returns 204 for valid challenges', async () => {
                const challenge = randomBytes(8).toString('hex')
                const body = JSON.stringify({ challenge })
                const enc = validNotificationHeaders['twitch-eventsub-message-id'] +
                            validNotificationHeaders['twitch-eventsub-message-timestamp'] +
                            body
                const signature = createHmac('sha256', validTestSecret).update(enc).digest('hex')

                await expect(fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...validNotificationHeaders,
                        'twitch-eventsub-message-type': 'webhook_callback_verification',
                        'twitch-eventsub-message-signature': `sha256=${signature}`,
                    },
                    body,
                })).resolves.toHaveProperty('status', 200)
            })
            test('responds with the challenge text', async () => {
                const challenge = randomBytes(8).toString('hex')
                const body = JSON.stringify({ challenge })
                const enc = validNotificationHeaders['twitch-eventsub-message-id'] +
                            validNotificationHeaders['twitch-eventsub-message-timestamp'] +
                            body
                const signature = createHmac('sha256', validTestSecret).update(enc).digest('hex')

                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...validNotificationHeaders,
                        'twitch-eventsub-message-type': 'webhook_callback_verification',
                        'twitch-eventsub-message-signature': `sha256=${signature}`,
                    },
                    body,
                })

                await expect(res.text()).resolves.toEqual(challenge)
            })
        })
        describe('notification message type', () => {
            test('returns 204 for valid notification events', async () => {
                const body = JSON.stringify({subscription: { type: 'channel.follow' }, event: {}})
                const enc = validNotificationHeaders['twitch-eventsub-message-id'] +
                            validNotificationHeaders['twitch-eventsub-message-timestamp'] +
                            body
                const signature = createHmac('sha256', validTestSecret).update(enc).digest('hex')
                const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(() => {})

                await expect(fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...validNotificationHeaders,
                        'twitch-eventsub-message-signature': `sha256=${signature}`,
                    },
                    body,
                })).resolves.toHaveProperty('status', 204)

                expect(consoleWarnMock).toHaveBeenCalledTimes(0)
            })
            test('should subscribe to the event', async () => {
                const subscriptionType = 'channel.follow'
                const listener = jest.fn()
                console.log(client, client.channel, client.channel.follow, client.channel.follow.notification)
                client.channel.follow.notification.addListener(listener)
                const data = {subscription: { type: subscriptionType }, event: {}}

                const body = JSON.stringify(data)
                const enc = validNotificationHeaders['twitch-eventsub-message-id'] +
                            validNotificationHeaders['twitch-eventsub-message-timestamp'] +
                            body
                const signature = createHmac('sha256', validTestSecret).update(enc).digest('hex')

                await expect(fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...validNotificationHeaders,
                        'twitch-eventsub-message-signature': `sha256=${signature}`,
                    },
                    body,
                })).resolves.toHaveProperty('status', 204)
                expect(listener).toHaveBeenCalledTimes(1)
                expect(listener).toHaveBeenCalledWith(data)
            })
        })
        describe('revocation message type', () => {
            test('returns 204 for valid revocation events', async () => {
                const body = JSON.stringify({subscription: { type: 'channel.follow' }})
                const hmac = createHmac('sha256', validTestSecret)
                const enc = validNotificationHeaders['twitch-eventsub-message-id'] +
                            validNotificationHeaders['twitch-eventsub-message-timestamp'] +
                            body
                const signature = hmac.update(enc).digest('hex')

                await expect(fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...validNotificationHeaders,
                        'twitch-eventsub-message-type': 'revocation',
                        'twitch-eventsub-message-signature': `sha256=${signature}`,
                    },
                    body,
                })).resolves.toHaveProperty('status', 204)
            })
        })
        describe('unknown message type', () => {
            test('returns 403 for unknown message types', async () => {
                const invalidTestMessageType = 'BADBEEF'
                const body = JSON.stringify({subscription: { type: 'channel.follow' }})
                const hmac = createHmac('sha256', validTestSecret)
                const enc = validNotificationHeaders['twitch-eventsub-message-id'] +
                            validNotificationHeaders['twitch-eventsub-message-timestamp'] +
                            body
                const signature = hmac.update(enc).digest('hex')
                const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {})

                await expect(fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...validNotificationHeaders,
                        'twitch-eventsub-message-type': invalidTestMessageType,
                        'twitch-eventsub-message-signature': `sha256=${signature}`,
                    },
                    body,
                })).resolves.toHaveProperty('status', 403)

                expect(consoleErrorMock).toHaveBeenCalledTimes(1)
                expect(consoleErrorMock).toHaveBeenCalledWith('EventSub middleware received invalid message type:', invalidTestMessageType)
            })
        })
    })
})