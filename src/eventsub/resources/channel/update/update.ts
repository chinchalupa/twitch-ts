import type { Subscription } from '../../subscription/subscription'

export type ChannelUpdate = 'channel.update'
export type ChannelUpdateEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    title: string
    language: string
    category_id: string
    category_name: string
    content_classification_labels: string[]
}
export type ChannelUpdateSubscription = Subscription<
    ChannelUpdate,
    '2',
    {
        broadcaster_user_id: string
        moderator_user_id: string
    }
>
