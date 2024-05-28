import type { Subscription } from '../../../subscription/subscription'

export type ChannelChatSettingsUpdate = 'channel.chat_settings.update'

export type ChannelChatSettingsUpdateSubscription = Subscription<
    ChannelChatSettingsUpdate,
    '1',
    {
        broadcaster_user_id: string
    }
>

export type ChannelChatSettingsUpdateEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    emote_mode: boolean
    subscriber_mode: boolean
    unique_chat_mode: boolean
} & ({
    follower_mode: true
    follower_mode_duration_minutes: number
} | {
    follower_mode: false
    follower_mode_duration_minutes: null
}) & ({
    slow_mode: true
    slow_mode_wait_time_seconds: number
})