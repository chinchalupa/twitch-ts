import type { Subscription } from '../../../subscription/subscription'

export type ChannelSubscriptionGift = 'channel.subscription.gift'

export type ChannelSubscriptionGiftSubscription = Subscription<
    ChannelSubscriptionGift,
    '1',
    {
        broadcaster_user_id: string
    }
>

export type ChannelSubscriptionGiftEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    user_id: string
    user_login: string
    user_name: string
    total: number
    tier: '1000' | '2000' | '3000'
} & ({
    is_anonymous: false
    cumulative_total: null
} | {
    is_anonymous: true
    cumulative_total: number
})

