import type { Subscription } from '../../../subscription/subscription'

export type ChannelHypeTrainProgress = 'channel.hype_train.progress'
export type ChannelHypeTrainProgressSubscription = Subscription<
    ChannelHypeTrainProgress,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelHypeTrainProgressEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    total: number
    progress: number
    level: number
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
