import type { Subscription } from '../../../subscription/subscription'

export type ChannelPredictionEnd = 'channel.prediction.end'
export type ChannelPredictionEndSubscription = Subscription<
    ChannelPredictionEnd,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelPredictionEndEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    title: string
    winning_outcome_id: string
    outcomes: {
        id: string
        title: string
        users: number
        channel_points: number
        color: string
        top_predictors: {
            user_id: string
            user_login: string
            user_name: string
            channel_points_won: number | null
            channel_points_used: number
        }[]
    }[]
    status: 'resolved' | 'canceled'
    started_at: string
    locked_at: string
    ended_at: string
}
