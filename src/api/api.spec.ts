import { afterAll, beforeAll, beforeEach, describe, expect, jest, test } from '@jest/globals'
import { setupServer } from 'msw/node'
import { DefaultBodyType, http, HttpResponse, HttpResponseResolver, JsonBodyType, PathParams } from 'msw'
import { randomBytes } from 'node:crypto'
import { getJSONFixture } from '../test/getJSONFixture'
import { DeleteEndpointSearchParams, GetEndpoint, PostEndpoint, PostEnpdointData, apiClient } from './api'

describe('api', () => {
    const BAD_REQUEST = { status: 400, message: 'Bad Request', error: 'Bad Request' }

    const validClientId = randomBytes(10).toString('hex')
    const validClientSecret = randomBytes(10).toString('hex')

    const mockAuthMiddleware = jest
        .fn<HttpResponseResolver<PathParams, DefaultBodyType, JsonBodyType>>()
        .mockImplementation(async ({request}) => {
            const body = await request.body!.getReader().read()
            const value = JSON.parse(new TextDecoder().decode(body.value))

            if (value.client_id !== validClientId || value.client_secret !== validClientSecret) {
                return HttpResponse.json(BAD_REQUEST, { status: 400 })
            }

            return HttpResponse.json({
                access_token: randomBytes(20).toString('hex'),
                expires_in: 3600,
                token_type: 'bearer',
            })
        })
    beforeEach(async () => mockAuthMiddleware.mockClear())

    const server = setupServer(
        http.post('https://id.twitch.tv/oauth2/token', mockAuthMiddleware),
    )
    beforeAll(() => server.listen())
    afterAll(() => server.close())

    const getEndpoints: [keyof GetEndpoint][] = [
        ['cheermotes'],
        ['extensions/transactions'],
        ['channels'],
        ['chat/emotes'],
        ['chat/emotes/global'],
    ]

    const deleteEndpoints: [keyof DeleteEndpointSearchParams][] = [
        ['eventsub/subscriptions'],
    ]

    const postEndpoints: [keyof PostEndpoint][] = [
        ['eventsub/subscriptions'],
        ['chat/messages'],
    ]

    const postEndpointData: PostEnpdointData = {
        'eventsub/subscriptions': {
            id: randomBytes(10).toString('hex'),
            type: 'channel.follow',
            status: 'enabled',
            version: '1',
            condition: {
                broadcaster_user_id: '1234',
            },
            transport: {
                method: 'webhook',
                callback: 'https://example.com',
            },
            created_at: '2021-01-01T00:00:00Z',
        },
        'chat/messages': {
            broadcaster_id: '1234',
            message: 'test',
            sender_id: '5678',
        },
    }

    const badAuthTestCases: [string | null, string | null][] = [
        [null, validClientSecret],
        [validClientId, null],
        ['invalid', validClientSecret],
        [validClientId, 'invalid'],
    ]

    describe.each(getEndpoints)('get %s', (endpoint) => {
        const resultData = getJSONFixture(`api/responses/${endpoint}.json`)

        const mockEndpointMiddleware = jest
            .fn<HttpResponseResolver<PathParams, DefaultBodyType, JsonBodyType>>()
            .mockImplementation(() => HttpResponse.json(resultData))

        beforeEach(async () => mockEndpointMiddleware.mockClear()) // Clear data only.

        server.use(http.get(`https://api.twitch.tv/helix/${endpoint}`, mockEndpointMiddleware))
        test('returns data on valid call', async () => {
            const api = apiClient({ clientId: validClientId, clientSecret: validClientSecret })

            expect(mockEndpointMiddleware).toHaveBeenCalledTimes(0)
            await expect(api.get(endpoint, {})).resolves.toEqual(resultData)
            expect(mockEndpointMiddleware).toHaveBeenCalledTimes(1)
        })
        test('reuses the access token', async () => {
            const api = apiClient({ clientId: validClientId, clientSecret: validClientSecret })

            expect(mockAuthMiddleware).toHaveBeenCalledTimes(0)
            await expect(api.get(endpoint, {})).resolves.toEqual(resultData)
            expect(mockAuthMiddleware).toHaveBeenCalledTimes(1)
            expect(mockEndpointMiddleware).toHaveBeenCalledTimes(1)
            await expect(api.get(endpoint, {})).resolves.toEqual(resultData)
            expect(mockAuthMiddleware).toHaveBeenCalledTimes(1)
            expect(mockEndpointMiddleware).toHaveBeenCalledTimes(2)
        
        })
        test.each(badAuthTestCases)('returns 401 on invalid auth %s %s', async (clientId, clientSecret) => {
            const api = apiClient({ clientId, clientSecret } as any)

            expect(mockAuthMiddleware).toHaveBeenCalledTimes(0)
            await expect(api.get(endpoint, {})).rejects.toHaveProperty('status', 401)
            expect(mockAuthMiddleware).toHaveBeenCalledTimes(1)
            expect(mockEndpointMiddleware).toHaveBeenCalledTimes(0)
        })
    })
    describe.each(deleteEndpoints)(`delete %s`, (endpoint) => {
        const mockEndpointMiddleware = jest
            .fn<HttpResponseResolver<PathParams, DefaultBodyType, JsonBodyType>>()
            .mockImplementationOnce(({request}) => {
                const {searchParams} = new URL(request.url)
                if (!searchParams.get('id')) {
                    return HttpResponse.json(BAD_REQUEST, { status: 400 })
                }
                return HttpResponse.json({ status: 204 })
            })
        beforeEach(async () => mockEndpointMiddleware.mockClear())

        test('should call the endpoint', async () => {
            server.use(http.delete(`https://api.twitch.tv/helix/${endpoint}`, mockEndpointMiddleware, { once: true }))

            const api = apiClient({ clientId: validClientId, clientSecret: validClientSecret })

            await expect(api.delete(endpoint, {id: 'test'})).resolves.toHaveProperty('status', 204)
            expect(mockEndpointMiddleware).toHaveBeenCalledTimes(1)
        })
        test.each(badAuthTestCases)('returns 401 on invalid auth %s %s', async (clientId, clientSecret) => {
            const api = apiClient({ clientId, clientSecret } as any)

            expect(mockAuthMiddleware).toHaveBeenCalledTimes(0)
            await expect(api.delete(endpoint, {id: 'test'})).rejects.toHaveProperty('status', 401)
            expect(mockAuthMiddleware).toHaveBeenCalledTimes(1)
            expect(mockEndpointMiddleware).toHaveBeenCalledTimes(0)
        })
    })
    describe.each(postEndpoints)(`post %s`, (endpoint) => {
        const queryData = postEndpointData[endpoint]

        const mockEndpointMiddleware = jest
            .fn<HttpResponseResolver<PathParams, DefaultBodyType, JsonBodyType>>()
            .mockReturnValue(HttpResponse.json({ status: 204 }))
        beforeEach(async () => mockEndpointMiddleware.mockClear())

        test('should return data', async () => {
            server.use(http.post(`https://api.twitch.tv/helix/${endpoint}`, mockEndpointMiddleware, { once: true }))

            const api = apiClient({ clientId: validClientId, clientSecret: validClientSecret })

            await expect(api.create(endpoint, queryData)).resolves.toBeDefined()
            expect(mockEndpointMiddleware).toHaveBeenCalledTimes(1)
        })
        test.each(badAuthTestCases)('returns 401 on invalid auth %s %s', async (clientId, clientSecret) => {
            const api = apiClient({ clientId, clientSecret } as any)

            expect(mockAuthMiddleware).toHaveBeenCalledTimes(0)
            await expect(api.create(endpoint, queryData)).rejects.toHaveProperty('status', 401)
            expect(mockAuthMiddleware).toHaveBeenCalledTimes(1)
            expect(mockEndpointMiddleware).toHaveBeenCalledTimes(0)
        })
    })
    test('should create the subscription', async () => {
        const mockEndpointMiddleware = jest
            .fn<HttpResponseResolver<PathParams, DefaultBodyType, JsonBodyType>>()
            .mockReturnValue(HttpResponse.json({ status: 204 }))

        server.use(http.post(`https://api.twitch.tv/helix/eventsub/subscriptions`, mockEndpointMiddleware, { once: true }))

        const api = apiClient({
            clientId: validClientId,
            clientSecret: validClientSecret,
        })

        await expect(api.create('eventsub/subscriptions', {
            condition: {
                broadcaster_user_id: '1234',
            },
            transport: {
                method: 'webhook',
                callback: 'https://example.com',
                secret: 'secret',
            },
            type: 'channel.follow',
            created_at: '2021-01-01T00:00:00Z',
            id: '1234',
            status: 'enabled',
            version: '2',
        })).resolves.toHaveProperty('status', 204)

        expect(mockEndpointMiddleware).toHaveBeenCalledTimes(1)
    })
    test('data parameter to query parameter conversion', async () => {
        const broadcaster_id = 'test'
        const data = getJSONFixture('api/responses/cheermotes.json')
        const mockEndpointMiddleware = jest
            .fn<HttpResponseResolver<PathParams, DefaultBodyType, JsonBodyType>>()
            .mockImplementation(({request}) => {
            const receivedBroadcasterId = new URL(request.url).searchParams.get('broadcaster_id')
            if (receivedBroadcasterId !== broadcaster_id) {
                    return HttpResponse.json(BAD_REQUEST, { status: 400 })
                }
                return HttpResponse.json(data)
            })

        server.use(http.get(`https://api.twitch.tv/helix/cheermotes`, mockEndpointMiddleware, { once: true }))

        const api = apiClient({
            clientId: validClientId,
            clientSecret: validClientSecret,
        })

        await expect(api.get('cheermotes', { broadcaster_id })).resolves.toEqual(data)
        expect(mockEndpointMiddleware).toHaveBeenCalledTimes(1)
    })
    test('data array parameter to query parameter conversion', async () => {
        const testUserIds = ['1234', 'asdf']
        const data = getJSONFixture('api/responses/users.json')
        const testFn = jest
            .fn<HttpResponseResolver<PathParams, DefaultBodyType, JsonBodyType>>()
            .mockImplementation(({request: {url}}) => {
                const {searchParams} = new URL(url)
                if (!searchParams.get('id') && !searchParams.get('login')) {
                    return HttpResponse.json({ status: 400, message: 'Missing id or login', error: 'Bad Request' })
                }
                return HttpResponse.json(data)
            })

        server.use(http.get(`https://api.twitch.tv/helix/users`, testFn, { once: true }))

        const api = apiClient({
            clientId: validClientId,
            clientSecret: validClientSecret,
        })

        await expect(api.get('users', { id: testUserIds })).resolves.toEqual(data)
        expect(testFn).toHaveBeenCalledTimes(1)
    })
})