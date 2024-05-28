import { Subscription } from '../../../subscription/subscription'

export type ChannelChatClearUserMessages = 'channel.chat.clear_user_messages'

export type ChannelChatClearUserMessagesSubscription = Subscription<
    ChannelChatClearUserMessages,
    '1',
    {
        broadcaster_user_id: string
        user_id: string
    }
>

export type ChannelChatClearUserMessagesEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    target_user_id: string
    target_user_login: string
    target_user_name: string
}
