import type { Subscription } from '../../../subscription/subscription'

export type ChannelShoutoutCreate = 'channel.shoutout.create'
export type ChannelShoutoutCreateSubscription = Subscription<
    ChannelShoutoutCreate,
    '1',
    {
        broadcaster_user_id: string
        moderator_user_id: string
    }
>
export type ChannelShoutoutCreateEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    moderator_user_id: string
    moderator_user_login: string
    moderator_user_name: string
    to_broadcaster_user_id: string
    to_broadcaster_user_login: string
    to_broadcaster_user_name: string
    started_at: string
    viewer_count: number
    cooldown_ends_at: string
    target_cooldown_ends_at: string
}
