import { describe, expect, jest, test } from '@jest/globals'
import { getJSONFixture } from '../test/getJSONFixture'
import { type SubscriptionEventMap } from '../types'
import { AnyNotification, AnyRevocation, type NotificationEventListener, eventSubClient } from './eventsub'

describe('eventsub', () => {
    const eventCases: [keyof SubscriptionEventMap][] = [
        ['automod.message.hold'],
        ['automod.message.update'],
        ['automod.settings.update'],
        ['automod.terms.update'],
        ['channel.update'],
        ['channel.follow'],
        ['channel.ad_break.begin'],
    ]

    describe.each(eventCases)('%s', (event) => {
        const data = getJSONFixture(`eventsub/notification/${event}.json`) as Parameters<NotificationEventListener<typeof event>>[0]

        test('should emit notification', () => {
            const client = eventSubClient()
            const callback = jest.fn()

            client.addNotificationEventListener(event, callback)
            client.emitNotification(data)

            expect(callback).toHaveBeenCalledTimes(1)
            expect(callback).toHaveBeenCalledWith(data)
        })
        test('should emit generic notification event on notification', () => {
            const client = eventSubClient()
            const callback = jest.fn()

            client.addNotificationEventListener(AnyNotification, callback)
            client.emitNotification(data)

            expect(callback).toHaveBeenCalledTimes(1)
            expect(callback).toHaveBeenCalledWith(data)
        })
        test('should emit revocation event', () => {
            const client = eventSubClient()
            const callback = jest.fn()

            client.addRevocationEventListener(data.subscription.type, callback)
            client.emitRevocation({subscription: data.subscription})

            expect(callback).toHaveBeenCalledTimes(1)
            expect(callback).toHaveBeenCalledWith({subscription: data.subscription})
        })
        test('should emit generic revocation event on revocation', () => {
            const client = eventSubClient()
            const callback = jest.fn()

            client.addRevocationEventListener(AnyRevocation, callback)
            client.emitRevocation({subscription: data.subscription})

            expect(callback).toHaveBeenCalledTimes(1)
            expect(callback).toHaveBeenCalledWith({subscription: data.subscription})
        })
    })
})
