export type DataArray<T> = {
    data: T[]
}

export type Pagination = {
    pagination: {
        cursor?: string
    }
}

export type User = {
    id: string
    login: string
    display_name: string
    type: string
    broadcaster_type: string
    description: string
    profile_image_url: string
    offline_image_url: string
    view_count: number
    email?: string
    created_at: string
}

export type Clip = {
    id: string
    url: string
    embed_url: string
    broadcaster_id: string
    broadcaster_name: string
    creator_id: string
    creator_name: string
    video_id: string
    game_id: string
    language: string
    title: string
    view_count: number
    created_at: string
    thumbnail_url: string
    duration: number
    vod_offset: number
    is_featured: boolean
}

export type Cheermote = {
    prefix: string
    tiers: {
        min_bits: number
        id: '1' | '100' | '500' | '1000' | '5000' | '10000' | '100000'
        color: string
        images: {
            dark: {
                animated: {
                    '1': string
                    '1.5': string
                    '2': string
                    '3': string
                    '4': string
                }
                static: {
                    '1': string
                    '1.5': string
                    '2': string
                    '3': string
                    '4': string
                }
            }
            light: {
                animated: {
                    '1': string
                    '1.5': string
                    '2': string
                    '3': string
                    '4': string
                }
                static: {
                    '1': string
                    '1.5': string
                    '2': string
                    '3': string
                    '4': string
                }
            }
        }
        can_cheer: boolean
        show_in_bits_card: boolean
    }[]
    type: 'global_first_party' | 'global_third_party' | 'channel_custom' | 'display_only' | 'sponsored'
    order: number
    last_updated: string
    is_charitable: boolean
}

export type ExtensionTransaction = {
    id: string
    timestamp: string
    broadcaster_id: string
    broadcaster_name: string
    user_id: string
    user_login: string
    user_name: string
    product_type: 'BITS_IN_EXTENSION'
    product_data: {
        domain: string
        sku: string
        cost: {
            amount: number
            type: 'bits'
        }
        inDevelopment: boolean
        displayName: string
        expiration: string
        broadcast: boolean
    }
    product: string
    transaction_id: string
    purchased_at: string
}

export type ChannelInfo = {
    broadcaster_id: string
    broadcaster_login: string
    broadcaster_name: string
    game_name: string
    game_id: string
    title: string
    delay: number
    tags: string[]
    content_classification_labels: string[]
    is_branded_content: boolean
}

export type Emote = {
    id: string
    name: string
    images: {
        url_1x: string
        url_2x: string
        url_4x: string
    }
    // tier: string
    emote_type: string
    emote_set_id: string
    format: ['static' | 'animated'],
    scale: ['1.0' | '2.0' | '3.0']
    theme_mode: 'dark' | 'light'
    template: string
}

export type Badge = {
    set_id: string
    versions: {
        id: string
        image_url_1x: string
        image_url_2x: string
        image_url_4x: string
        title: string
        description: string
        click_action: string
        click_url: string
    }
}

export type ChatSettings = {
    broadcaster_id: string
    emote_mode: boolean
    follower_mode: boolean
    follower_mode_duration: number
    moderator_id: string
    non_moderator_chat_delay: boolean
    non_moderator_chat_delay_duration: number
    slow_mode: boolean
    slow_mode_wait_time: number
    subscriber_mode: boolean
    unique_chat_mode: boolean
}

export type ChatColor = {
    user_id: string
    user_login: string
    user_name: string
    color: string
}

export type ContentClassificationLabels = {
    id: string
    description: string
    name: string
}

export type ExtensionLive = {
    broadcaster_id: string
    broadcaster_name: string
}

export type Stream = {
    id: string
    user_id: string
    user_login: string
    user_name: string
    game_id: string
    game_name: string
    type: string
    title: string
    tags: string[],
    viewer_count: number
    started_at: string
    language: string
    thumbnail_url: string
    tag_ids: string[]
    is_mature: boolean
}

export type DeleteEndpointSearchParams = {
    'eventsub/subscriptions': { id: string }
}

export type Tag = {
    tag_id: string
    is_auto: boolean
    localization_names: { [language: string]: string }
    localization_descriptions: { [language: string]: string }
}

export type Video = {
    id: string
    stream_id: string | null
    user_id: string
    user_login: string
    user_name: string
    title: string
    description: string
    created_at: string
    published_at: string
    url: string
    thumbnail_url: string
    viewable: 'public'
    view_count: number
    language: string
    type: 'upload' | 'archive' | 'highlight'
    duration: number
    muted_segments: { duration: number, offset: number }[] | null
}

export type Version = '1' | '2' | 'beta'

export type Id = { id: string }

export type Name = { name: string }

export type IsAnonymous = { is_anonymous: boolean }

export type Session = { session_id: string }

// Date and time fields.
export type StartedAt = { started_at: string }
export type EndedAt = { ended_at: string }

export type BadgeInfo = Id & {
    set_id: string
    info: string
}

export type CheermoteMessageFragment = {
    type: 'cheermote'
    text: string
    cheermote: {
        prefix: string
        bits: number
        tier: number
    }
    emote: null
}

export type EmoteMessageFragment = {
    type: 'emote'
    text: string
    emote: Id & {
        emote_set_id: string
    }
    cheermote: null
}

export type TextMessageFragment = {
    type: 'text'
    text: string
    emote: null
    cheermote: null
}

export type MentionFragment = {
    type: 'mention'
    text: string
    mention: {
        user_id: string
        user_login: string
        user_name: string
    }
}

export type Message = {
    message_id: string
}

export type ChatMessage = Message & {
    message: {
        text: string
        fragments: [CheermoteMessageFragment | EmoteMessageFragment | TextMessageFragment | MentionFragment]
    }
}

export type UserMessageDetails = {
    color: string
    badges: BadgeInfo[]
    message_type: 'text' | 'channel_points_highlighted' | 'channel_points_sub_only' | 'user_intro'
    cheer?: { bits: number }
    reply?: PrefixProps<'parent', UserProps> & PrefixProps<'thread', UserProps> & {
        parent_message_id: string
        parent_message_body: string
        thread_message_id: string
    }
    channel_points_custom_reward_id?: string
}

export type ChannelDetails = {
    title: string
    language: string
    content_classification_labels: string[]
}


export type ChatNotificationMessage = {
    chatter_is_anonymous: boolean
    color: string
    badges: BadgeInfo[]
    system_message: string
    notice_type: string
    sub?: string
    resub?: string
    sub_gift?: string
    community_sub_gift?: string
    gift_paid_upgrade?: string
    prime_paid_upgrade?: string
    pay_it_forward?: string
    raid?: string
    unraid?: string
    announcement: {
        color: string
    }
    bits_badge_tier?: string
    charity_donation?: string
}

export type ChannelChatSettings = {
    emote_mode: boolean
    follower_mode: boolean
    follower_mode_duration_minutes?: number
    slow_mode: boolean
    slow_mode_wait_time_seconds?: number
    subscribe_mode: boolean
    unique_chat_mode: boolean
}

export type CurrencyAmount = {
    value: number
    decimal_places: number
    currency: string

}

export type Charity = PrefixProps<'charity', Name & {
    description: string
    logo: string
    website: string
}>

export type Choice = Id & {
    title: string
}

export type Contribution = User & {
    total: number
    type: string
}

export type CustomReward = {
    is_enabled: boolean
    is_paused: boolean
    is_in_stock: boolean
    title: string
    cost: number
    prompt: string
    is_user_input_required: boolean
    max_per_stream: { is_enabled: boolean, value: number }
    max_per_user_per_stream: { is_enabled: boolean, value: number }
    global_cooldown: { is_enabled: boolean, seconds: number }
    background_color: string
    default_image: { url_1x: string, url_2x: string, url_4x: string }
    image: { url_1x: string, url_2x: string, url_4x: string }
}

export type RewardRedemption = {
    reward: Id & {
        title: string
        cost: number
        prompt: string
    }
    redeemed_at: string
}

export type Outcome = Choice & {
    color: string,
    users: number,
    channel_points: number,
    top_predictors: (User & {
        channel_points_won?: number
        channel_points_user?: number
    })[]
}

export type ChannelSubscription = {
    tier: string
    is_gift: boolean
}

export type EmoteInstance = Id & {
    text: string
    'set-id': string
}

export type Cheer = {
    text: string
    amount: number
    prefix: string
    tier: number
}

export type EmotePosition = {
    begin: number
    end: number
    id: string
}

export type AdBreak = {
    duration_seconds: number
    started_at: string
    is_automatic: boolean
}

export type AutomodMessage = Message & {
    message: string
    level: number
    category: string
    held_at: string
    fragments: {
        emotes: EmoteInstance[]
        cheermotes: Cheer[]
    }
}

export type AutomodSettings = {
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

export type AutomodTerms = {
    action: string
    from_automod: boolean
    terms: string[]
}

export type PrefixProps<Type extends Lowercase<string>, EventType> = {
    [Property in keyof EventType as `${Type}_${Lowercase<string & Property>}`]: EventType[Property]
}

export type UserProps = PrefixProps<'user', Id & Name & { login: string }> // user_id, user_name, and user_login.
export type RequesterUser = PrefixProps<'requester', UserProps>
export type TargetUser = PrefixProps<'target', UserProps>
export type ChatterUser = PrefixProps<'chatter', UserProps>
export type ModeratorUser = PrefixProps<'moderator', UserProps>

export type BroadcasterUser = PrefixProps<'broadcaster', UserProps>
export type ToBroadcasterUser = PrefixProps<'to', BroadcasterUser>
export type FromBroadcasterUser = PrefixProps<'from', BroadcasterUser>

export type Category = PrefixProps<'category', Name & Id>

export type UserCondition = PrefixProps<'user', Id>
export type BroadcasterUserCondition = PrefixProps<'broadcaster', UserCondition>
export type FromBroadcasterUserCondition = PrefixProps<'from', BroadcasterUserCondition>
export type ToBroadcasterUserCondition = PrefixProps<'to', BroadcasterUserCondition>
export type ModeratorUserCondition = PrefixProps<'moderator', UserCondition>
export type RewardCondition = PrefixProps<'reward', Id>
// export type ConduitCondition = PrefixProps<'conduit', Id>



export type SubscriptionEventMap = {
    'automod.message.hold': BroadcasterUser & UserProps & AutomodMessage
    'automod.message.update': BroadcasterUser & UserProps & AutomodMessage
    'automod.settings.update': AutomodSettings
    'automod.terms.update': BroadcasterUser & ModeratorUser & AutomodTerms
    'channel.update': BroadcasterUser & Category & ChannelDetails
    'channel.follow': BroadcasterUser & UserProps & { followed_at: string }
    'channel.ad_break.begin': BroadcasterUser & RequesterUser & AdBreak
    'channel.chat.clear': BroadcasterUser
    'channel.chat.clear_user_messages': BroadcasterUser & TargetUser
    'channel.chat.message': BroadcasterUser & ChatterUser & ChatMessage & UserMessageDetails
    'channel.chat.message_delete': BroadcasterUser & TargetUser & Message
    'channel.chat.notification': BroadcasterUser & ChatterUser & Message & ChatNotificationMessage
    'channel.chat_settings.update': BroadcasterUser & ChannelChatSettings
    'channel.chat.user_message_hold': BroadcasterUser & UserProps & Message
    'channel.chat.user_message_update': BroadcasterUser & UserProps & Message & { status: string }
    'channel.subscribe': BroadcasterUser & UserProps & ChannelSubscription
    'channel.subscription.end': BroadcasterUser & UserProps & ChannelSubscription
    'channel.subscription.gift': BroadcasterUser & UserProps & { tier: string, total: number, cumulative_total?: number } & IsAnonymous
    'channel.subscription.message': BroadcasterUser & UserProps & { message: { text: string, emotes: EmotePosition[] }, cumulative_months: number, streak_months: number,  duration_months: number }
    'channel.cheer': BroadcasterUser & UserProps & IsAnonymous & { message: string, bits: number }
    'channel.raid': PrefixProps<'from', BroadcasterUser> & ToBroadcasterUser & { viewers: number }
    'channel.ban': UserProps & BroadcasterUser & ModeratorUser & { reason: string, banned_at: string, ends_at: string, is_permanent: boolean }
    'channel.unban': UserProps & BroadcasterUser & ModeratorUser & { reason: string }
    'channel.unban_request.create': Id & BroadcasterUser & UserProps & { text: string, created_at: string }
    'channel.unban_request.resolve': Id & BroadcasterUser & ModeratorUser & UserProps & { resolution_text: string, status: string }
    // 'channel.moderate': // TODO: Implement this event.
    'channel.moderator.add': UserProps & BroadcasterUser
    'channel.moderator.remove': UserProps & BroadcasterUser
    'channel.guest_star_session.begin': BroadcasterUser & ModeratorUser & Session & StartedAt
    'channel.guest_star_session.end': BroadcasterUser & ModeratorUser & Session & StartedAt & EndedAt
    'channel.guest_star_guest.update': BroadcasterUser & ModeratorUser & PrefixProps<'guest', UserProps> & Session & { slot_id: string, status: string, host_video_enabled: boolean, host_audio_enabled: boolean, host_volume: number }
    'channel.guest_star_settings.update': BroadcasterUser & { is_moderator_send_live_enabled: boolean, slot_count: number, is_browser_source_audio_enabled: boolean, group_layout: string }
    'channel.channel_points_automatic_reward.add': BroadcasterUser & UserProps & { id: string, reward: { type: string, cost: number, unlocked_emote: null }, message: { text: string, emotes: {id: string, begin: number, end: number}[], user_input: string, redeemed_at: string}}
    'channel.channel_points_custom_reward.add': BroadcasterUser & CustomReward
    'channel.channel_points_custom_reward.update': Id & BroadcasterUser & CustomReward
    'channel.channel_points_custom_reward.remove': Id & BroadcasterUser & CustomReward
    'channel.channel_points_custom_reward_redemption.add': Id & BroadcasterUser & UserProps & RewardRedemption
    'channel.channel_points_custom_reward_redemption.update': Id & BroadcasterUser & UserProps & RewardRedemption & { status: string }
    'channel.poll.begin': Id & BroadcasterUser & StartedAt & { title: string, choices: Choice[], bits_voting: { is_enabled: boolean, amount_per_vote: number }, channel_points_voting: { is_enabled: boolean, amount_per_vote: number }, ends_at: string }
    'channel.poll.progress': Id & BroadcasterUser & { title: string, choices: (Choice & { bits_votes: number, channel_points_votes: number, votes: number})[] }
    'channel.poll.end': Id & BroadcasterUser & StartedAt & { title: string, choices: (Choice & { bits_votes: number, channel_points_votes: number, votes: number})[], bits_voting: { is_enabled: true, amount_per_vote: number }, channel_points_voting: { is_enabled: true, amount_per_vote: number }, status: string, ends_at: string }
    'channel.prediction.begin': Id & BroadcasterUser & StartedAt & { title: string, outcomes: (Choice & { color: string })[], ends_at: string }
    'channel.prediction.progress': Id & BroadcasterUser & StartedAt & { title: string, outcomes: Outcome[], locks_at: string }
    'channel.prediction.lock': Id & BroadcasterUser & StartedAt & { title: string, outcomes: Outcome[], locked_at: string }
    'channel.prediction.end': Id & BroadcasterUser & StartedAt & EndedAt & { title: string, winning_outcome_id: string, outcomes: Outcome[], status: 'resolved' | 'canceled' }
    'channel.vip.add': BroadcasterUser & UserProps
    'channel.vip.remove': BroadcasterUser & UserProps
    'channel.charity_campaign.donate': Id & BroadcasterUser & UserProps & Charity & { amount: CurrencyAmount }
    'channel.charity_campaign.start': Id & BroadcasterUser & Charity & StartedAt & { current_amount: CurrencyAmount, target_amount: CurrencyAmount }
    'channel.charity_campaign.progress': Id & BroadcasterUser & Charity & StartedAt & { current_amount: CurrencyAmount, target_amount: CurrencyAmount }
    'channel.charity_campaign.stop': Id & BroadcasterUser & Charity & { current_amount: CurrencyAmount, target_amount: CurrencyAmount }
    // 'conduit.shard.disabled': { method: string, session_id: string, connected_at: string, disconnected_at: string }[]
    // 'drop.entitlement.grant': Id & PrefixProps<'organization', Id>
    'extension.bits_transaction.create': Id & BroadcasterUser & UserProps & { extension_client_id: string, product: { name: string, sku: string, bits: number, in_development: boolean } }
    'channel.goal.begin': Id & BroadcasterUser & StartedAt & { type: string, description: string, current_amount: number, target_amount: number }
    'channel.goal.progress': Id & BroadcasterUser & StartedAt & { type: string, description: string, current_amount: number, target_amount: number }
    'channel.goal.end': Id & BroadcasterUser & StartedAt & { type: string, description: string, current_amount: number, target_amount: number, ended_at: string, is_achieved: boolean }
    'channel.hype_train.begin': Id & BroadcasterUser & StartedAt & { total: number, progress: number, goal: number, top_contributions: Contribution[], last_contribution: Contribution, level: number, expires_at: string }
    'channel.hype_train.progress': Id & BroadcasterUser & StartedAt & { level: number, total: number, progress: number, goal: number, top_contributions: Contribution[], last_contribution: Contribution, expires_at: string }
    'channel.hype_train.end': Id & BroadcasterUser & { level: number, total: number, top_contributions: Contribution[], last_contribution: Contribution, started_at: string, ended_at: string, cooldown_ends_at: string }
    'channel.shield_mode.begin': BroadcasterUser & StartedAt
    'channel.shield_mode.end': BroadcasterUser & EndedAt
    'channel.shoutout.create': BroadcasterUser & ModeratorUser & ToBroadcasterUser & StartedAt & { viewer_count: number, cooldown_ends_at: string, target_cooldown_ends_at: string }
    'channel.shoutout.receive': BroadcasterUser & FromBroadcasterUser & StartedAt & { viewer_count: number }
    'stream.online': Id & BroadcasterUser & StartedAt & { type: string }
    'stream.offline': BroadcasterUser
    'user.authorization.grant': UserProps & { client_id: string }
    'user.authorization.revoke': UserProps & { client_id: string }
    'user.update': UserProps & { email: string, email_verified: boolean, description: string }
    'user.whisper.message': PrefixProps<'from', UserProps> & PrefixProps<'to', UserProps> & { whisper_id: string, whisper: { text: string }}
}

// export type SubscriptionType = [
//     { type: 'automod.message.hold', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'automod.message.update', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'automod.settings.update', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'automod.terms.update', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.update', version: '2', condition: BroadcasterUserCondition },
//     { type: 'channel.follow', version: '2', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.ad_break.begin', version: '1', condition: { broadcaster_id: string } },
//     { type: 'channel.chat.clear', version: '1', condition: BroadcasterUserCondition & UserCondition },
//     { type: 'channel.chat.clear_user_messages', version: '1', condition: BroadcasterUserCondition & UserCondition },
//     { type: 'channel.chat.message', version: '1', condition: BroadcasterUserCondition & UserCondition },
//     { type: 'channel.chat.message_delete', version: '1', condition: BroadcasterUserCondition & UserCondition },
//     { type: 'channel.chat.notification', version: '1', condition: BroadcasterUserCondition & UserCondition },
//     { type: 'channel.chat_settings.update', version: '1', condition: BroadcasterUserCondition & UserCondition },
//     { type: 'channel.chat.user_message_hold', version: '1', condition: BroadcasterUserCondition & UserCondition },
//     { type: 'channel.chat.user_message_update', version: 'beta', condition: BroadcasterUserCondition & UserCondition },
//     { type: 'channel.subscribe', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.subscription.end', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.subscription.gift', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.subscription.message', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.cheer', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.raid', version: '1', condition: FromBroadcasterUserCondition | ToBroadcasterUserCondition },
//     { type: 'channel.ban', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.unban', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.unban_request.create', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.unban_request.resolve', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.moderate', version: 'beta', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.moderator.add', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.moderator.remove', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.guest_star_session.begin', version: 'beta', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.guest_star_session.end', version: 'beta', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.guest_star_guest.update', version: 'beta', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.guest_star_settings.update', version: 'beta', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.channel_points_automatic_reward.add', version: 'beta', condition: BroadcasterUserCondition },
//     { type: 'channel.channel_points_custom_reward.add', version: '1', condition: BroadcasterUserCondition & RewardCondition },
//     { type: 'channel.channel_points_custom_reward.update', version: '1', condition: BroadcasterUserCondition & RewardCondition },
//     { type: 'channel.channel_points_custom_reward.remove', version: '1', condition: BroadcasterUserCondition & RewardCondition },
//     { type: 'channel.channel_points_custom_reward_redemption.add', version: '1', condition: BroadcasterUserCondition & RewardCondition },
//     { type: 'channel.channel_points_custom_reward_redemption.update', version: '1', condition: BroadcasterUserCondition & RewardCondition },
//     { type: 'channel.poll.begin', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.poll.progress', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.poll.end', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.prediction.begin', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.prediction.progress', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.prediction.lock', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.prediction.end', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.vip.add', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.vip.remove', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.charity_campaign.donate', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.charity_campaign.start', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.charity_campaign.progress', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.charity_campaign.stop', version: '1', condition: BroadcasterUserCondition },
//     // { type: 'conduit.shard.disabled', version: '1', condition: BroadcasterUserCondition },
//     // { type: 'drop.entitlement.grant', version: '1', condition: BroadcasterUserCondition },
//     { type: 'extension.bits_transaction.create', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.goal.begin', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.goal.progress', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.goal.end', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.hype_train.begin', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.hype_train.progress', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.hype_train.end', version: '1', condition: BroadcasterUserCondition },
//     { type: 'channel.shield_mode.begin', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.shield_mode.end', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.shoutout.create', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'channel.shoutout.receive', version: '1', condition: BroadcasterUserCondition & ModeratorUserCondition },
//     { type: 'stream.online', version: '1', condition: BroadcasterUserCondition },
//     { type: 'stream.offline', version: '1', condition: BroadcasterUserCondition },
//     { type: 'user.authorization.grant', version: '1', condition: BroadcasterUserCondition },
//     { type: 'user.authorization.revoke', version: '1', condition: BroadcasterUserCondition },
//     { type: 'user.update', version: '1', condition: UserCondition },
//     { type: 'user.whisper.message', version: 'beta', condition: UserCondition },
// ]

export type SubscriptionCondition = {
    'automod.message.hold': BroadcasterUserCondition & ModeratorUserCondition
    'automod.message.update': BroadcasterUserCondition & ModeratorUserCondition
    'automod.settings.update': BroadcasterUserCondition & ModeratorUserCondition
    'automod.terms.update': BroadcasterUserCondition & ModeratorUserCondition
    'channel.update': BroadcasterUserCondition
    'channel.follow': BroadcasterUserCondition & ModeratorUserCondition
    'channel.ad_break.begin': { broadcaster_id: string }
    'channel.chat.clear': BroadcasterUserCondition & UserCondition
    'channel.chat.clear_user_messages': BroadcasterUserCondition & UserCondition
    'channel.chat.message': BroadcasterUserCondition & UserCondition
    'channel.chat.message_delete': BroadcasterUserCondition & UserCondition
    'channel.chat.notification': BroadcasterUserCondition & UserCondition
    'channel.chat_settings.update': BroadcasterUserCondition & UserCondition
    'channel.chat.user_message_hold': BroadcasterUserCondition & UserCondition
    'channel.chat.user_message_update': BroadcasterUserCondition & UserCondition
    'channel.subscribe': BroadcasterUserCondition
    'channel.subscription.end': BroadcasterUserCondition
    'channel.subscription.gift': BroadcasterUserCondition
    'channel.subscription.message': BroadcasterUserCondition
    'channel.cheer': BroadcasterUserCondition
    'channel.raid': FromBroadcasterUserCondition | ToBroadcasterUserCondition
    'channel.ban': BroadcasterUserCondition & ModeratorUserCondition
    'channel.unban': BroadcasterUserCondition
    'channel.unban_request.create': BroadcasterUserCondition & ModeratorUserCondition
    'channel.unban_request.resolve': BroadcasterUserCondition & ModeratorUserCondition
    // 'channel.moderate': BroadcasterUserCondition & ModeratorUserCondition
    'channel.moderator.add': BroadcasterUserCondition
    'channel.moderator.remove': BroadcasterUserCondition
    'channel.guest_star_session.begin': BroadcasterUserCondition & ModeratorUserCondition
    'channel.guest_star_session.end': BroadcasterUserCondition & ModeratorUserCondition
    'channel.guest_star_guest.update': BroadcasterUserCondition & ModeratorUserCondition
    'channel.guest_star_settings.update': BroadcasterUserCondition & ModeratorUserCondition
    'channel.channel_points_automatic_reward.add': BroadcasterUserCondition
    'channel.channel_points_custom_reward.add': BroadcasterUserCondition & RewardCondition
    'channel.channel_points_custom_reward.update': BroadcasterUserCondition & RewardCondition
    'channel.channel_points_custom_reward.remove': BroadcasterUserCondition & RewardCondition
    'channel.channel_points_custom_reward_redemption.add': BroadcasterUserCondition & RewardCondition
    'channel.channel_points_custom_reward_redemption.update': BroadcasterUserCondition & RewardCondition
    'channel.poll.begin': BroadcasterUserCondition
    'channel.poll.progress': BroadcasterUserCondition
    'channel.poll.end': BroadcasterUserCondition
    'channel.prediction.begin': BroadcasterUserCondition
    'channel.prediction.progress': BroadcasterUserCondition
    'channel.prediction.lock': BroadcasterUserCondition
    'channel.prediction.end': BroadcasterUserCondition
    'channel.vip.add': BroadcasterUserCondition
    'channel.vip.remove': BroadcasterUserCondition
    'channel.charity_campaign.donate': BroadcasterUserCondition
    'channel.charity_campaign.start': BroadcasterUserCondition
    'channel.charity_campaign.progress': BroadcasterUserCondition
    'channel.charity_campaign.stop': BroadcasterUserCondition
    // 'conduit.shard.disabled': BroadcasterUserCondition
    // 'drop.entitlement.grant': BroadcasterUserCondition
    'extension.bits_transaction.create': BroadcasterUserCondition
    'channel.goal.begin': BroadcasterUserCondition
    'channel.goal.progress': BroadcasterUserCondition
    'channel.goal.end': BroadcasterUserCondition
    'channel.hype_train.begin': BroadcasterUserCondition
    'channel.hype_train.progress': BroadcasterUserCondition
    'channel.hype_train.end': BroadcasterUserCondition
    'channel.shield_mode.begin': BroadcasterUserCondition & ModeratorUserCondition
    'channel.shield_mode.end': BroadcasterUserCondition & ModeratorUserCondition
    'channel.shoutout.create': BroadcasterUserCondition & ModeratorUserCondition
    'channel.shoutout.receive': BroadcasterUserCondition & ModeratorUserCondition
    'stream.online': BroadcasterUserCondition
    'stream.offline': BroadcasterUserCondition
    'user.authorization.grant': BroadcasterUserCondition
    'user.authorization.revoke': BroadcasterUserCondition
    'user.update': UserCondition
    'user.whisper.message': UserCondition
}

const SubscriptionVersionMap: Record<keyof SubscriptionEventMap, Version> = {
    'automod.message.hold': '1',
    'automod.message.update': '1',
    'automod.settings.update': '1',
    'automod.terms.update': '1',
    'channel.update': '2',
    'channel.follow': '2',
    'channel.ad_break.begin': '1',
    'channel.chat.clear': '1',
    'channel.chat.clear_user_messages': '1',
    'channel.chat.message': '1',
    'channel.chat.message_delete': '1',
    'channel.chat.notification': '1',
    'channel.chat_settings.update': '1',
    'channel.chat.user_message_hold': '1',
    'channel.chat.user_message_update': 'beta',
    'channel.subscribe': '1',
    'channel.subscription.end': '1',
    'channel.subscription.gift': '1',
    'channel.subscription.message': '1',
    'channel.cheer': '1',
    'channel.raid': '1',
    'channel.ban': '1',
    'channel.unban': '1',
    'channel.unban_request.create': '1',
    'channel.unban_request.resolve': '1',
    // 'channel.moderate': 'beta',
    'channel.moderator.add': '1',
    'channel.moderator.remove': '1',
    'channel.guest_star_session.begin': 'beta',
    'channel.guest_star_session.end': 'beta',
    'channel.guest_star_guest.update': 'beta',
    'channel.guest_star_settings.update': 'beta',
    'channel.channel_points_automatic_reward.add': 'beta',
    'channel.channel_points_custom_reward.add': '1',
    'channel.channel_points_custom_reward.update': '1',
    'channel.channel_points_custom_reward.remove': '1',
    'channel.channel_points_custom_reward_redemption.add': '1',
    'channel.channel_points_custom_reward_redemption.update': '1',
    'channel.poll.begin': '1',
    'channel.poll.progress': '1',
    'channel.poll.end': '1',
    'channel.prediction.begin': '1',
    'channel.prediction.progress': '1',
    'channel.prediction.lock': '1',
    'channel.prediction.end': '1',
    'channel.vip.add': 'beta',
    'channel.vip.remove': 'beta',
    'channel.charity_campaign.donate': '1',
    'channel.charity_campaign.start': '1',
    'channel.charity_campaign.progress': '1',
    'channel.charity_campaign.stop': '1',
    // 'conduit.shard.disabled': '1',
    // 'drop.entitlement.grant': '1',
    'extension.bits_transaction.create': '1',
    'channel.goal.begin': '1',
    'channel.goal.progress': '1',
    'channel.goal.end': '1',
    'channel.hype_train.begin': '1',
    'channel.hype_train.progress': '1',
    'channel.hype_train.end': '1',
    'channel.shield_mode.begin': '1',
    'channel.shield_mode.end': '1',
    'channel.shoutout.create': '1',
    'channel.shoutout.receive': '1',
    'stream.online': '1',
    'stream.offline': '1',
    'user.authorization.grant': '1',
    'user.authorization.revoke': '1',
    'user.update': '1',
    'user.whisper.message': 'beta',
} as const


export type WebhookTransport = {
    method: 'webhook'
    callback: string
    secret?: string
}

export type Condition = {
    broadcaster_user_id: string
    moderator_user_id?: string
}

export type Subscription<T extends keyof SubscriptionEventMap> = {
    id: string
    type: T
    condition: SubscriptionCondition[T]
    version: SubscriptionVersionMap[T]
    status: string
    transport: WebhookTransport
    created_at: string
}
