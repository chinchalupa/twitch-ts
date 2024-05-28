import type { Subscription } from '../../../subscription/subscription'

export type ChannelSubscriptionMessage = 'channel.subscription.message'
export type ChannelSubscriptionMessageSubscription = Subscription<
    ChannelSubscriptionMessage,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelSubscriptionMessageEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    user_id: string
    user_login: string
    user_name: string
    tier: '1000' | '2000' | '3000'
    message: {
        text: string
        emotes: {
            begin: number
            end: number
            id: string
        }[]
    },
    cumulative_months: number
    streak_months: number
    duration_months: number
}
