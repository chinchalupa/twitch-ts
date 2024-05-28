import type { Subscription } from '../../../subscription/subscription'

export type ChannelAdBreakBegin = 'channel.ad_break.begin'
export type ChannelAdBreakBeginEvent = {
    duration_seconds: number
    started_at: string
    is_automatic: boolean
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    requester_user_id: string
    requester_user_login: string
    requester_user_name: string
}
export type ChannelAdBreakBeginSubscription = Subscription<
    ChannelAdBreakBegin,
    '1',
    {
        broadcaster_user_id: string
    }
>
