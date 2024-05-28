import { Subscription } from "../../subscription/subscription"

export type ChannelSubscribe = 'channel.subscribe'

export type ChannelSubscribeSubscription = Subscription<
    ChannelSubscribe,
    '1',
    {
        broadcaster_user_id: string
    }
>

export type ChannelSubscribeEvent = {
    user_id: string
    user_name: string
    user_login: string
    broadcaster_user_id: string
    broadcaster_user_name: string
    broadcaster_user_login: string
    tier: '1000' | '2000' | '3000'
    is_gift: boolean
}
