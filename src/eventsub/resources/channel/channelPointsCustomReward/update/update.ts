import { Subscription } from "../../../subscription/subscription"

export type ChannelChannelPointsCustomRewardUpdate = 'channel.channel_points_custom_reward.update'
export type ChannelChannelPointsCustomRewardUpdateSubscription = Subscription<
    ChannelChannelPointsCustomRewardUpdate,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelChannelPointsCustomRewardUpdateEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    is_enabled: boolean
    is_paused: boolean
    is_in_stock: boolean
    title: string
    cost: number
    prompt: string
    is_user_input_required: boolean
    should_redemptions_skip_request_queue: boolean
    cooldown_expires_at: string
    redemptions_redeemed_current_stream: number
    max_per_stream: {
        is_enabled: boolean
        value: number
    }
    max_per_user_per_stream: {
        is_enabled: boolean
        value: number
    }
    global_cooldown: {
        is_enabled: boolean
        seconds: number
    }
    background_color: string
    image: {
        url_1x: string
        url_2x: string
        url_4x: string
    }
    default_image: {
        url_1x: string
        url_2x: string
        url_4x: string
    }
}
