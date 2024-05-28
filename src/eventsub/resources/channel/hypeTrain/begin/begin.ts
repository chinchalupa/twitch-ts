import type { Subscription } from '../../../subscription/subscription'

export type ChannelHypeTrainBegin = 'channel.hype_train.begin'
export type ChannelHypeTrainBeginSubscription = Subscription<
    ChannelHypeTrainBegin,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelHypeTrainBeginEvent = {
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
    last_contribution: {
        user_id: string
        user_login: string
        user_name: string
        type: 'bits' | 'subscription' | 'other'
        total: number
    }
    started_at: string
    expires_at: string
}