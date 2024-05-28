import type { Subscription } from '../../../subscription/subscription'

export type ChannelPredictionBegin = 'channel.prediction.begin'
export type ChannelPredictionBeginSubscription = Subscription<
    ChannelPredictionBegin,
    '1',
    {
        broadcaster_user_id: string
        broadcaster_user_login: string
        broadcaster_user_name: string
        title: string
        outcomes: {
            id: string
            title: string
            users: number
            channel_points: number
        }[]
        started_at: string
        locks_at: string
        ends_at: string
    }
>
export type ChannelPredictionBeginEvent = {
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
    }[]
    started_at: string
    locks_at: string
}
