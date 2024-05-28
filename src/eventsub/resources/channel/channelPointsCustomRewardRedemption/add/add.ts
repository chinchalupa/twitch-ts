import type { Subscription } from '../../../subscription/subscription'

export type ChannelChannelPointsCustomRewardRedemptionAdd = 'channel.channel_points_custom_reward_redemption.add'
export type ChannelChannelPointsCustomRewardRedemptionAddSubscription = Subscription<
    ChannelChannelPointsCustomRewardRedemptionAdd,
    '1',
    {
        broadcaster_user_id: string
        reward_id: string
    }
>
export type ChannelChannelPointsCustomRewardRedemptionAddEvent = {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    user_id: string
    user_login: string
    user_name: string
    user_input: string
    status: 'unfulfilled' | 'fulfilled' | 'canceled'
    redeemed_at: string
    reward: {
        id: string
        title: string
        prompt: string
        cost: number
        is_user_input_required: boolean
        is_sub_only: boolean
        image: string
    }
}
