import type { Subscription } from '../../subscription/subscription'

export type StreamOffline = 'stream.offline'
export type StreamOfflineSubscription = Subscription<
    StreamOffline,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type StreamOfflineEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
}
