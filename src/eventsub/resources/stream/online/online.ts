import type { Subscription } from '../../subscription/subscription'

export type StreamOnline = 'stream.online'
export type StreamOnlineSubscription = Subscription<
    StreamOnline,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type StreamOnlineEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    type: 'live'
    started_at: string
}
