import type { Subscription } from '../../../subscription/subscription'

export type ChannelChatClear = 'channel.chat.clear'

export type ChannelChatClearSubscription = Subscription<
    ChannelChatClear,
    '1',
    {
        broadcaster_user_id: string
        user_id: string
    }
>

export type ChannelChatClearEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
}
