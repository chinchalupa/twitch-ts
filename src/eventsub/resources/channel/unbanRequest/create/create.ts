import type { Subscription } from '../../../subscription/subscription'

export type ChannelUnbanRequestCreate = 'channel.unban_request.create'
export type ChannelUnbanRequestCreateSubscription = Subscription<
    ChannelUnbanRequestCreate,
    '1',
    {
        broadcaster_user_id: string
        user_id: string
        user_login: string
        user_name: string
    }
>
export type ChannelUnbanRequestCreateEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    user_id: string
    user_login: string
    user_name: string
    text: string
    created_at: string
}
