import type { Subscription } from '../../subscription/subscription'

export type ChannelCheer = 'channel.cheer'
export type ChannelCheerSubscription = Subscription<
    ChannelCheer,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelCheerEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    message: string
    bits: number
} & ({
    is_anonymous: false
    user_id: null
    user_login: null
    user_name: null
} | {
    is_anonymous: true
    user_id: string
    user_login: string
    user_name: string
})
