import type { Subscription } from '../../subscription/subscription'

export type ChannelFollow = 'channel.follow'
export type ChannelFollowSubscription = Subscription<
    ChannelFollow,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelFollowEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    user_id: string
    user_login: string
    user_name: string
    followed_at: string
}
