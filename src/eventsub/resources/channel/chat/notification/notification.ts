import type { Subscription } from "../../../subscription/subscription"

export type ChannelChatNotification = 'channel.chat.notification'

export type ChannelChatNotificationSubscription = Subscription<
    ChannelChatNotification,
    '1',
    {
        broadcaster_user_id: string
        user_id: string
    }
>

export type ChannelChatNotificationEvent = {
    broadcaster_user_id: string
    broadcaster_user_name: string
    broadcaster_user_login: string
    chatter_user_id: string
    chatter_user_name: string
    chatter_user_login: string
    chatter_is_anonymous: boolean
    color: string
    badges: {
        set_id: string
        id: string
        info: string
    }[]
    system_message: string
    message_id: string
    message: {
        text: string
        fragments: [{
            type: 'text'
            text: string
        } | {
            type: 'cheermote'
            prefix: string
            bits: number
            tier: number
        } | {
            type: 'emote'
            id: string
            owner_id: string
            emote_set_id: string
            format: ('static' | 'animated')[]

        } | {
            type: 'mention'
            user_id: string
            user_name: string
            user_login: string
            text: string
        }]
    }
} & ({
    notice_type: 'sub'
    sub: {
        sub_tier: '1000' | '2000' | '3000'
        is_prime: boolean
        duration_months: number
    }
} | {
    notice_type: 'resub'
    resub: {
        cumulative_months: number
        duration_months: number
        streak_months: number
        sub_tier: string
        is_prime: boolean
        is_gift: boolean
        gifter_is_anonymous: boolean
        gifter_user_id: string
        gifter_user_name: string
        gifter_user_login: string
    }
} | {
    notice_type: 'sub_gift'
    sub_gift: {
        duration_months: number
        cumulative_total: number | null
        recipient_user_id: string
        recipient_user_name: string
        recipient_user_login: string
        sub_tier: '1000' | '2000' | '3000'
        community_gift_id: string | null
    }
} | {
    notice_type: 'community_sub_gift'
    community_sub_gift: {
        id: string
        total: number
        sub_tier: '1000' | '2000' | '3000'
        cumulative_total: number
    }
} | {
    notice_type: 'gift_paid_upgrade'
    gift_paid_upgrade: {
        user_id: string
        user_name: string
        user_login: string
        promo_gift_total: number
        promo_gift_trigger_type: 'sub' | 'bits' | 'anonymous'
        promo_gift_trigger_user_id: string
        promo_gift_trigger_user_name: string
        promo_gift_trigger_user_login: string
    }
} | {
    notice_type: 'prime_paid_upgrade'
    prime_paid_upgrade: {
        user_id: string
        user_name: string
        user_login: string
    }
} | {
    notice_type: 'raid'
    raid: {
        user_id: string
        user_name: string
        user_login: string
        viewers: number
    }
} | {
    notice_type: 'unraid'
    unraid: {
        user_id: string
        user_name: string
        user_login: string
    }
} | {
    notice_type: 'pay_it_forward'
    pay_it_forward: {
        gifter_is_anonymous: boolean
        gifter_user_id: string | null
        gifter_user_name: string | null
        gifter_user_login: string | null
    }
} | {
    notice_type: 'announcement'
    announcement: {
        color: string
    }
} | {
    notice_type: 'charity_donation'
    charity_donation: {
        charity_name: string
        amount: {
            value: number
            decimal_place: number
            currency: string
        }
    }
} | {
    notice_type: 'bits_badge_tier'
    bits_badge_tier: {
        tier: number
    }
})
