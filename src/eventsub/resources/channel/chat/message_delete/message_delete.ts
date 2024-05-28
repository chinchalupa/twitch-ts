import type { Subscription } from '../../../subscription/subscription'

export type ChannelChatMessageDelete = 'channel.chat.message_delete'

export type ChannelChatMessageDeleteSubscription = Subscription<
    ChannelChatMessageDelete,
    '1',
    {
        broadcaster_user_id: string
        user_id: string
    }
>

export type ChannelChatMessageDeleteEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    target_user_id: string
    target_user_login: string
    target_user_name: string
    message_id: string
}
