import type { Subscription } from '../../../subscription/subscription'

export type ChannelHypeTrainEnd = 'channel.hype_train.end'
export type ChannelHypeTrainEndSubscription = Subscription<
    ChannelHypeTrainEnd,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelHypeTrainEndEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    total: number
    progress: number
    goal: number
    top_contributions: {
        user_id: string
        user_login: string
        user_name: string
        type: 'bits' | 'subscription' | 'other'
        total: number
    }[]
    started_at: string
    ended_at: string
    cooldown_ends_at: string
}