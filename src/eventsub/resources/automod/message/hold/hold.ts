import type { Subscription } from '../../../subscription/subscription'

export type AutomodMessageHold = 'automod.message.hold'
export type AutomodMessageHoldEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    user_id: string
    user_login: string
    user_name: string
    message: string
    level: number
    held_at: string
    category: string
    fragments: {
        emotes: {
            id: string
            'set-id': string
            text: string
        },
        cheermotes: {
            text: string
            amount: number
            prefix: string
            tier: number
        }
    }
}
export type AutomodMessageHoldSubscription = Subscription<
    AutomodMessageHold,
    '1',
    {
        broadcaster_user_id: string,
        moderator_user_id: string,
    }
>
