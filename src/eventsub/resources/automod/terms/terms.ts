import { Subscription } from "../../subscription/subscription"

export type AutomodTermsUpdate = 'automod.terms.update'
export type AutomodTermsUpdateEvent = {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    moderator_user_id: string
    moderator_user_login: string
    moderator_user_name: string
    action: string
    from_automod: boolean
    terms: [string]
}
export type AutomodTermsUpdateSubscription = Subscription<
    AutomodTermsUpdate,
    '1',
    {
        broadcaster_user_id: string
        moderator_user_id: string
    }
>
