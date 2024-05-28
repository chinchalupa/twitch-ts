import type { Subscription } from '../../../subscription/subscription'

export type ChannelPollBegin = 'channel.poll.begin'
export type ChannelPollBeginSubscription = Subscription<
    ChannelPollBegin,
    '1',
    {
        broadcaster_user_id: string
    }
>
export type ChannelPollBeginEvent = {
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
    started_at: string
    ends_at: string
}
