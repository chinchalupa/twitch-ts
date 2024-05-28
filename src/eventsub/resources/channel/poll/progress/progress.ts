import { Subscription } from '../../../subscription/subscription'

export type ChannelPollProgress = 'channel.poll.progress'
export type ChannelPollProgressSubscription = Subscription<
    ChannelPollProgress,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelPollProgressEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    title: string
    choices: {
        id: string
        title: string
        bits_votes: 0
        channel_points_votes: number
        votes: number
    }[]
    channel_points_voting: {
        is_enabled: boolean
        amount_per_vote: number
    }
    bits_voting: {
        is_enabled: boolean
        amount_per_vote: number
    }
    started_at: string
    ends_at: string
}
