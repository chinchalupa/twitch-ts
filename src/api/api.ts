import type { Subscription } from "../eventsub/resources/subscription/subscription"
import type { DataArray, Cheermote, ExtensionTransaction, Pagination, ChannelInfo, Emote, Badge, ChatSettings, ChatColor, Clip, ContentClassificationLabels, ExtensionLive, Stream, Tag, User, Video } from "../types"

export type OAuth2Token = {
    accessToken: string
    expiresAt: number
}

export type AppCredentials = {
    clientId: string
    clientSecret: string
}

export type TwitchApiError = {
    error: string
    status: number
    message: string
}

export type GetEndpoint = {
    'cheermotes': DataArray<Cheermote>
    'extensions/transactions': DataArray<ExtensionTransaction> & Pagination
    'channels': DataArray<ChannelInfo>
    'chat/emotes': DataArray<Emote & { tier: string }>
    'chat/emotes/global': DataArray<Emote>
    'chat/emotes/set': DataArray<Emote>
    'chat/badges': DataArray<Badge>
    'chat/badges/global': DataArray<Badge>
    'chat/settings': DataArray<ChatSettings>
    'chat/color': DataArray<ChatColor>
    'clips': DataArray<Clip> & Pagination
    'content_classification_labels': DataArray<ContentClassificationLabels>
    'extensions/live': DataArray<ExtensionLive> & Pagination
    'eventsub/subscriptions': DataArray<Subscription<string, string, object>> & Pagination
    'games/top': DataArray<{id: string, name: string, box_art_url: string, igdb_id: string}> & Pagination
    'games': DataArray<{id: string, name: string, box_art_url: string, igdb_id: string}> & Pagination
    'schedule': { data: { segments: { id: string, start_time: string, end_time: string, title: string, canceled_until: string | null, category: { id: string, name: string }, is_recurring: boolean }[]} & { broadcaster_id: string, broadcaster_name: string, broadcaster_login: string, vacation: { start_time: string, end_time: string } | null } } & Pagination
    'streams': DataArray<Stream> & Pagination
    'streams/tags': DataArray<Tag> & Pagination
    'users': DataArray<User>
    'videos': DataArray<Video> & Pagination
}

export type GetEndpointSearchParams = {
    'cheermotes': { broadcaster_id?: string }
    'extensions/transactions': { extension_id: string, first?: string, after?: string, id?: string }
    'channels': { broadcaster_id: string }
    'chat/emotes': { broadcaster_id: string }
    'chat/emotes/global': {}
    'chat/emotes/set': { emote_set_id: string }
    'chat/badges': { broadcaster_id: string }
    'chat/badges/global': {}
    'chat/settings': { broadcaster_id: string, moderator_id?: string }
    'chat/color': { user_id: string }
    'clips': { started_at?: string, ended_at?: string, first?: string, before?: string, after?: string, is_featured?: boolean } & ({ broadcaster_id: string } | { game_id: string } | { id: string })
    'content_classification_labels': { locale?: string }
    'extensions/live': { extension_id: string, first?: number, after?: string }
    'eventsub/subscriptions': { status?: string, type?: string, user_id?: string, after?: string }
    'games/top': { first?: number, after?: string, before: string }
    'games': { id: string[], name: string[], igdb_id: string[] }
    'schedule': { broadcaster_id: string, id?: string[], start_time?: string, first?: number, after?: string }
    'streams': { user_id?: string, user_login?: string, game_id?: string, language?: string, type?: string, first?: number, after?: string, before?: string }
    'streams/tags': { broadcaster_id: string }
    'users': { login?: string[], id?: string[] }
    'videos': { language?: string, period?: 'all' | 'day' | 'week' | 'month', sort?: 'time' | 'trending' | 'views', type: 'all' | 'archive' | 'highlight' | 'upload', first?: number, after?: string, before?: string }
}

export type PostEndpoint = {
    'chat/messages': DataArray<{message_id: string, is_sent: boolean }>
    'eventsub/subscriptions': DataArray<Subscription<string, string, object>> & { total: number, total_cost: number, max_total_cost: number }
}

export type PostEnpdointData = {
    'chat/messages': { broadcaster_id: string, sender_id: string, message: string, reply_parent_message_id?: string }
    'eventsub/subscriptions': Subscription<string, string, object>
}

export type DeleteEndpointSearchParams = {
    'eventsub/subscriptions': { id: string }
}

function formatEndpoint(
    endpoint: string,
    params: Record<string, string | string[] | number | boolean>
): string {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, Array.isArray(value) ? value.join(`&${key}=`) : value.toString())
    }
    const sp = searchParams.toString()
    return 'helix/' + endpoint + (sp ? `?${sp}` : '')
}

export function apiClient({
    clientId,
    clientSecret,
}: AppCredentials) {
    let token: OAuth2Token = { accessToken: '', expiresAt: 0 }

    async function getToken(): Promise<string> {
        if (token.expiresAt < Date.now()) {
            const response = await fetch('https://id.twitch.tv/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: 'client_credentials',
                }),
            })

            const data = await response.json()

            if (response.status !== 200) {
                return Promise.reject(`Failed to get token: ${data.message}`)
            }

            token = {
                accessToken: data.access_token,
                expiresAt: Date.now() + data.expires_in * 1000,
            }
        }
        return token.accessToken
    }

    async function makeRequest(endpoint: string, options: RequestInit): Promise<any | TwitchApiError> {
        try {
            var tokenResult = await getToken()
        } catch (e) {
            return Promise.reject({
                error: 'Unauthorized',
                status: 401,
                message: e,
            })
        }
        
        const response = await fetch(`https://api.twitch.tv/${endpoint}`, {
            ...options,
            headers: {
                Authorization: `Bearer ${tokenResult}`,
                'Client-Id': clientId,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        })
        return response.json()
    }

    return {
        get<T extends keyof GetEndpoint>(endpoint: T, params: GetEndpointSearchParams[T]): Promise<GetEndpoint[T]> {
            return makeRequest(formatEndpoint(endpoint, params), { method: 'GET' })
        },
        create<T extends keyof PostEndpoint>(endpoint: T, data: PostEnpdointData[T]): Promise<PostEndpoint[T] | TwitchApiError> {
            return makeRequest(`helix/${endpoint}`, { method: 'POST', body: JSON.stringify(data) })
        },
        delete<T extends keyof DeleteEndpointSearchParams>(endpoint: T, params: DeleteEndpointSearchParams[T]): Promise<void | TwitchApiError> {
            return makeRequest(formatEndpoint(endpoint, params), { method: 'DELETE' })
        },
    }
}
