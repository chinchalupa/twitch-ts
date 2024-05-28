import type { Subscription } from '../../../subscription/subscription'

export type AutomodMessageUpdate = 'automod.message.update'
export type AutomodMessageUpdateEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    user_id: string
    user_login: string
    user_name: string
    message: string
    level: number
    updated_at: string
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
export type AutomodMessageUpdateSubscription = Subscription<
    AutomodMessageUpdate,
    '1',
    {
        broadcaster_user_id: string,
        moderator_user_id: string,
    }
>
