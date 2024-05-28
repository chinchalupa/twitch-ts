import type { Subscription } from '../../subscription/subscription'

export type ChannelRaid = 'channel.raid'

export type ChannelRaidSubscription = Subscription<
    ChannelRaid,
    '1',
    {
        to_broadcaster_user_id: string
    } | {
        from_broadcaster_user_id: string
    }
>

export type ChannelRaidEvent = {
    from_broadcaster_user_id: string
    from_broadcaster_user_login: string
    from_broadcaster_user_name: string
    to_broadcaster_user_id: string
    to_broadcaster_user_login: string
    to_broadcaster_user_name: string
    viewers: number
}
