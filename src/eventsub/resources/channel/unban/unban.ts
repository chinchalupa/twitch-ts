import type { Subscription } from '../../subscription/subscription'

export type ChannelUnban = 'channel.unban'
export type ChannelUnbanSubscription = Subscription<
    ChannelUnban,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelUnbanEvent = {
    user_id: string
    user_login: string
    user_name: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    moderator_user_id: string
    moderator_user_login: string
    moderator_user_name: string
}
