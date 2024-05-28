import type { Subscription } from '../../../subscription/subscription'

export type ChannelChatMessage = 'channel.chat.message'
export type ChannelChatMessageEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    chatter_user_id: string
    chatter_user_login: string
    chatter_user_name: string
    message_id: string
    message: {
        text: string
        fragments: [{
            type: 'text'
            text: string
        } | {
            type: 'cheermote'
            text: string
            cheermote: {
                prefix: string
                bits: number
                tier: number
            }
        } | {
            type: 'emote'
            text: string
            emote: {
                id: string
                emote_set_id: string
                owner_id: string
                format: string
            }
        } | {
            type: 'mention'
            text: string
            mention: {
                user_id: string
                user_name: string
                user_login: string
            }
        }]
    }
    message_type: 'text' | 'channel_points_highlighted' | 'channel_points_sub_only' | 'user_intro'
    badges: {
        set_id: string
        id: string
        info: string
    }[]
    cheer?: {
        bits: number
    }
    color: string
    reply?: {
        parent_message_id: string
        parent_message_body: string
        parent_user_id: string
        parent_user_name: string
        parent_user_login: string
        thread_message_id: string
        thread_user_id: string
        thread_user_login: string
    }
    channel_points_custom_reward_id: string
}
export type ChannelChatMessageSubscription = Subscription<
    ChannelChatMessage,
    '1',
    {
        broadcaster_user_id: string
        user_id: string
    }
>
