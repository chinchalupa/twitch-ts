import type { Subscription } from '../../../subscription/subscription'

export type ChannelPredictionLock = 'channel.prediction.lock'
export type ChannelPredictionLockSubscription = Subscription<
    ChannelPredictionLock,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelPredictionLockEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    title: string
    outcomes: {
        id: string
        title: string
        users: number
        channel_points: number
        top_predictors: {
            user_name: string
            user_login: string
            user_id: string
            channel_points_won: number
            channel_points_used: number
        }[]
    }[]
    started_at: string
    locked_at: string
}