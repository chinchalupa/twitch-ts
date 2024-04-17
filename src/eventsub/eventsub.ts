import { EventEmitter } from 'events'
import { Subscription, SubscriptionEventMap } from '../types'

export const AnyNotification = 'notification' as const
export const AnyRevocation = 'revocation' as const

export type NotificationData = keyof SubscriptionEventMap | typeof AnyNotification
export type RevocationData = keyof SubscriptionEventMap | typeof AnyRevocation

/**
 * A listener function for Twitch EventSub revocation events.
 */
export type RevocationEventListener<T extends RevocationData> = {
    (data: {
        subscription: Subscription<T extends keyof SubscriptionEventMap ? keyof SubscriptionEventMap : any> & { cost: number },
    }): void
}

/**
 * A listener function for Twitch EventSub notification events.
 */
export type NotificationEventListener<T extends keyof SubscriptionEventMap | typeof AnyNotification> = {
    (data: {
        subscription: Subscription<T extends keyof SubscriptionEventMap ? T : any> & { cost: number },
        event: SubscriptionEventMap[T extends keyof SubscriptionEventMap ? T : any],
    }): void
}

/**
 * An object that can emit Twitch EventSub events and register listeners for them.
 */
export type EventSub = {
    emitNotification: <T extends keyof SubscriptionEventMap>(
        p : Parameters<NotificationEventListener<T>>[0]
    ) => boolean
    emitRevocation: <T extends keyof SubscriptionEventMap>(
        revocationEvent: Parameters<RevocationEventListener<T>>[0]
    ) => boolean
    addNotificationEventListener: <T extends keyof SubscriptionEventMap | typeof AnyNotification>(
        notification: T extends keyof SubscriptionEventMap ? T : typeof AnyNotification,
        callback: NotificationEventListener<T>,
    ) => void
    addRevocationEventListener: <T extends RevocationData>(
        revocation: RevocationData,
        callback: RevocationEventListener<T>,
    ) => void
}

/**
 * Creates a new handler for Twitch EventSub events.
 * @return An eventsub object.
 */
export function eventSubClient(): EventSub {
    const notificationEmitter = new EventEmitter()
    const revocationEmitter = new EventEmitter()

    return {
        addNotificationEventListener: <T extends keyof SubscriptionEventMap | typeof AnyNotification>(
            notification: T extends keyof SubscriptionEventMap ? T : typeof AnyNotification,
            callback: NotificationEventListener<T>,
        ) => notificationEmitter.on(notification, callback)
        ,
        addRevocationEventListener: <T extends RevocationData>(
            revocation: RevocationData,
            callback: RevocationEventListener<T>,
        ) => revocationEmitter.on(revocation, callback)
        ,
        emitNotification: <T extends keyof SubscriptionEventMap>(
            data: Parameters<NotificationEventListener<T>>[0],
        ) => {
            const isTypeNotificationSubscribed = notificationEmitter.emit(data.subscription.type, data)
            const isAnyNotificationSubscribed = notificationEmitter.emit(AnyNotification, data)
            return isTypeNotificationSubscribed || isAnyNotificationSubscribed
        },
        emitRevocation: <T extends keyof SubscriptionEventMap> (
            data: Parameters<RevocationEventListener<T>>[0]
        ) => {
            const isTypeRevocationSubscribed = revocationEmitter.emit(data.subscription.type, data)
            const isAnyNotificationSubscribed = revocationEmitter.emit(AnyRevocation, data)
            return isTypeRevocationSubscribed || isAnyNotificationSubscribed
        },
    }
}
