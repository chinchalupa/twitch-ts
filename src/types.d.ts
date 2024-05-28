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

export type AutomodTerms = {
    action: string
    from_automod: boolean
    terms: string[]
}

export type Condition = {
    broadcaster_user_id: string
    moderator_user_id?: string
}
