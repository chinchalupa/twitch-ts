import type { Subscription } from '../../subscription/subscription'

export type AutomodSettingsUpdate = 'automod.settings.update'
export type AutomodSettingsUpdateEvent = {
    broadcaster_id: string
    moderator_id: string
    overall_level: number
    disability: number
    aggression: number
    sexuality: number
    misogyny: number
    bullying: number
    swearing: number
    race_ethnicity_or_religion: number
    sex_based_terms: number
}
export type AutomodSettingsUpdateSubscription = Subscription<
    AutomodSettingsUpdate,
    '1',
    {
        broadcaster_user_id: string
        moderator_user_id: string
    }
>
