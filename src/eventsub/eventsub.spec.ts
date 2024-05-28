import { describe, expect, jest, test } from '@jest/globals'
import { EventsubNotificationEventMap, EventsubRevocationEventMap } from './resources/resource'
import { EventsubClient } from './eventsub'

function testClientEndpoint(
    type: string,
    client: EventsubClient = new EventsubClient(),
) {
    const endpoint = client.endpoint(type as keyof EventsubNotificationEventMap | keyof EventsubRevocationEventMap)

    expect(endpoint).toBeDefined()
    expect(endpoint).toHaveProperty('notification')
    expect(endpoint).toHaveProperty('revocation')
}

function testSubscribeToEventsubEventCallback(
    subscriptionType: string,
    eventType: 'notification' | 'revocation',
    data: any,
    callback: jest.Mock = jest.fn(),
    client: EventsubClient = new EventsubClient(),
) {
    const endpoint = client.endpoint(subscriptionType as keyof EventsubNotificationEventMap | keyof EventsubRevocationEventMap)[eventType]
    endpoint.on(callback)
    endpoint.emit(data)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(data)
}

function testUnsubscribeFromEventsubEventCallback(
    subscriptionType: string,
    eventType: 'notification' | 'revocation',
    data: any,
    callback: jest.Mock = jest.fn(),
    client: EventsubClient = new EventsubClient(),
) {
    const endpoint = client.endpoint(subscriptionType as keyof EventsubNotificationEventMap | keyof EventsubRevocationEventMap)[eventType]
    endpoint.on(callback)
    endpoint.off(callback)
    endpoint.emit(data)

    expect(callback).not.toHaveBeenCalled()
}

function testAddListenerToEventsubEventCallback(
    subscriptionType: string,
    eventType: 'notification' | 'revocation',
    data: any,
    callback: jest.Mock = jest.fn(),
    client: EventsubClient = new EventsubClient(),
) {
    const endpoint = client.endpoint(subscriptionType as keyof EventsubNotificationEventMap | keyof EventsubRevocationEventMap)[eventType]
    endpoint.addListener(callback)
    endpoint.emit(data)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(data)
}

function testRemoveListenerFromEventsubEventCallback(
    subscriptionType: string,
    eventType: 'notification' | 'revocation',
    data: any,
    callback: jest.Mock = jest.fn(),
    client: EventsubClient = new EventsubClient(),
) {
    const endpoint = client.endpoint(subscriptionType as keyof EventsubNotificationEventMap | keyof EventsubRevocationEventMap)[eventType]
    endpoint.addListener(callback)
    endpoint.removeListener(callback)
    endpoint.emit(data)

    expect(callback).not.toHaveBeenCalled()
}

function getEventsubTestCasePath(type: string, name: string) {
    return `../../fixtures/eventsub/${type.replace(/\./g, '/')}/${name}.json`
}

const testCases: [string, string[], string[]][] = [
    [
        'automod.message.hold',
        ['notification'],
        ['revocation'],
    ], [
        'automod.message.update',
        ['notification'],
        ['revocation'],
    ], [
        'automod.settings.update',
        ['notification'],
        ['revocation'],
    ], [
        'automod.terms.update',
        ['notification'],
        ['revocation'],
    ], [
        'channel.ad_break.begin',
        ['notification'],
        ['revocation'],
    ], [
        'channel.ban',
        ['notification.permanent', 'notification.temporary'],
        ['revocation'],
    ], [
        'channel.channel_points_custom_reward.update',
        ['notification'],
        ['revocation'],
    ], [
        'channel.channel_points_custom_reward_redemption.add',
        ['notification.canceled', 'notification.fulfilled', 'notification.unfulfilled'],
        ['revocation'],
    ], [
        'channel.chat.message',
        ['notification'],
        ['revocation'],
    ], [
        'channel.chat.clear',
        ['notification'],
        ['revocation'],
    ], [
        'channel.follow',
        ['notification'],
        ['revocation'],
    ], [
        'channel.update',
        ['notification'],
        ['revocation'],
    ]
]

describe('eventsub', () => {
    describe.each(testCases)('%s', (type, notificationFiles, revocationFiles) => {
        test('should get endpoint', testClientEndpoint.bind(null, type))
        describe.each(notificationFiles)('notification file %s', (name) => {
            const data = require(getEventsubTestCasePath(type, name))
            test('should match type', () => expect(data.subscription.type).toMatch(type))
            test('should emit notification', testSubscribeToEventsubEventCallback.bind(null, type, 'notification', data))
            test('should not emit notification after unsubscribing', testUnsubscribeFromEventsubEventCallback.bind(null, type, 'notification', data))
            test('should add listener for notification', testAddListenerToEventsubEventCallback.bind(null, type, 'notification', data))
            test('should remove listener for notification', testRemoveListenerFromEventsubEventCallback.bind(null, type, 'notification', data))
        })
        describe.each(revocationFiles)('revocation file %s', (name) => {
            const data = require(getEventsubTestCasePath(type, name))
            test('should match type', () => expect(data.subscription.type).toMatch(type))
            test('should emit revocation', testSubscribeToEventsubEventCallback.bind(null, type, 'revocation', data))
            test('should not emit revocation after unsubscribing', testUnsubscribeFromEventsubEventCallback.bind(null, type, 'revocation', data))
            test('should add listener for revocation', testAddListenerToEventsubEventCallback.bind(null, type, 'revocation', data))
            test('should remove listener for revocation', testRemoveListenerFromEventsubEventCallback.bind(null, type, 'revocation', data))
        })
    })
})
