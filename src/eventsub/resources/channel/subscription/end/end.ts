import type { Subscription } from '../../../subscription/subscription'

export type ChannelSubscriptionEnd = 'channel.subscription.end'

export type ChannelSubscriptionEndSubscription = Subscription<
    ChannelSubscriptionEnd,
    '1',
    {
        broadcaster_user_id: string
    }
>

export type ChannelSubscriptionEndEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    user_id: string
    user_login: string
    user_name: string
    tier: '1000' | '2000' | '3000'
    is_gift: boolean
}
