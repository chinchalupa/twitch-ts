import type { Subscription } from '../../../subscription/subscription'

export type ChannelChatUserMessageHold = 'channel.chat.user_message_hold'
export type ChannelChatUserMessageHoldSubscription = Subscription<
    ChannelChatUserMessageHold,
    '1',
    {
        broadcaster_user_id: string
        user_id: string
    }
>
export type ChannelChatUserMessageHoldEvent = {
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
