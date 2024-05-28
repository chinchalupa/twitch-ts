import { Subscription } from "../../../subscription/subscription"

export type ChannelUnbanRequestResolve = 'channel.unban_request.resolve'
export type ChannelUnbanRequestResolveSubscription = Subscription<
    ChannelUnbanRequestResolve,
    '1',
    {
        broadcaster_user_id: string
        moderator_user_id: string
    }
>
export type ChannelUnbanRequestResolveEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    moderator_user_id?: string
    moderator_user_login?: string
    moderator_user_name?: string
    user_id: string
    user_login: string
    user_name: string
    status: 'approved' | 'denied' | 'canceled'
    resolution_text?: string
}
