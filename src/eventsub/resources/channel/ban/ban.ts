import type { Subscription } from '../../subscription/subscription'

export type ChannelBan = 'channel.ban'
export type ChannelBanEvent = {
    user_id: string
    user_login: string
    user_name: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    moderator_user_id: string
    moderator_user_login: string
    moderator_user_name: string
    reason: string
    banned_at: string
} & ({
    is_permanent: false
    ends_at: string
} | {
    is_permanent: true
    ends_at: null
})
export type ChannelBanSubscription = Subscription<
    ChannelBan,
    '1',
    {
        broadcaster_user_id: string
    }
>
