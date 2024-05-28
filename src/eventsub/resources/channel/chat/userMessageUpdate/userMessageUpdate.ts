import type { Subscription } from '../../../subscription/subscription'

export type ChannelChatUserMessageUpdate = 'channel.chat.user_message_update'
export type ChannelChatUserMessageUpdateSubscription = Subscription<
    ChannelChatUserMessageUpdate,
    '1',
    {
    }
>
export type ChannelChatUserMessageUpdateEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    user_id: string
    user_login: string
    user_name: string
    message_id: string
    message: {
        text: string
        fragments: {
            text: string
            emote?: {
                id: string
                emote_set_id: string
            }
            cheermote: {
                prefix: string
                bits: number
                tier: number
            }
        }[]
    }[]
}