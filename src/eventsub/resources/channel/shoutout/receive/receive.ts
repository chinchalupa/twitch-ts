import type { Subscription } from '../../../subscription/subscription'

export type ChannelShoutoutRecieve = 'channel.shoutout.receive'
export type ChannelShoutoutRecieveSubscription = Subscription<
    ChannelShoutoutRecieve,
    '1',
    {
        broadcaster_user_id: string
        moderator_user_id: string
    }
>
export type ChannelShoutoutRecieveEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    from_broadcast_user_id: string
    from_broadcast_user_login: string
    from_broadcast_user_name: string
    started_at: string
    viewer_count: number
}
