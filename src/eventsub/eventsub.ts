import { EventEmitter } from 'events'
import type { EventsubNotificationEventMap, EventsubRevocationEventMap } from './resources/resource'
import { SubscriptionEventEmitter } from './resources/resource'

export class EventsubClient {
    constructor(
        protected readonly revocationEmitter = new EventEmitter<EventsubRevocationEventMap>(),
        protected readonly notificationEmitter = new EventEmitter<EventsubNotificationEventMap>(),
    ) {}
    revocation<K extends keyof EventsubRevocationEventMap>(
        type: K,
    ) {
        return new SubscriptionEventEmitter(type, this.revocationEmitter)
    }
    notification<K extends keyof EventsubNotificationEventMap>(
        type: K,
    ) {
        return new SubscriptionEventEmitter(type, this.notificationEmitter)
    }
    endpoint<K extends keyof EventsubNotificationEventMap & keyof EventsubRevocationEventMap>(
        type: K,
    ) {
        return {
            notification: this.notification.call(this, type satisfies keyof EventsubNotificationEventMap),
            revocation: this.revocation.call(this, type satisfies keyof EventsubRevocationEventMap),
        }
    }
    automod = {
        message: {
            hold: this.endpoint.call(this, 'automod.message.hold'),
            update: this.endpoint.call(this, 'automod.message.update'),
        },
        settings: {
            update: this.endpoint.call(this, 'automod.settings.update'),
        },
        terms: {
            update: this.endpoint.call(this, 'automod.terms.update'),
        },
    }
    channel = {
        ad_break: {
            begin: this.endpoint.call(this, 'channel.ad_break.begin'),
        },
        ban: this.endpoint.call(this, 'channel.ban'),
        channel_points_custom_reward: {
            update: this.endpoint.call(this, 'channel.channel_points_custom_reward.update'),
        },
        channel_points_custom_reward_redemption: {
            add: this.endpoint.call(this, 'channel.channel_points_custom_reward_redemption.add'),
        },
        chat: {
            clear: this.endpoint.call(this, 'channel.chat.clear'),
            clear_user_messages: this.endpoint.call(this, 'channel.chat.clear_user_messages'),
            message: this.endpoint.call(this, 'channel.chat.message'),
            message_delete: this.endpoint.call(this, 'channel.chat.message_delete'),
            notification: this.endpoint.call(this, 'channel.chat.notification'),
            user_message_hold: this.endpoint.call(this, 'channel.chat.user_message_hold'),
            user_message_update: this.endpoint.call(this, 'channel.chat.user_message_update'),
        },
        chat_settings: {
            update: this.endpoint.call(this, 'channel.chat_settings.update'),
        },
        cheer: this.endpoint.call(this, 'channel.cheer'),
        follow: this.endpoint.call(this, 'channel.follow'),
        hype_train: {
            begin: this.endpoint.call(this, 'channel.hype_train.begin'),
            end: this.endpoint.call(this, 'channel.hype_train.end'),
            progress: this.endpoint.call(this, 'channel.hype_train.progress'),
        },
        poll: {
            begin: this.endpoint.call(this, 'channel.poll.begin'),
            end: this.endpoint.call(this, 'channel.poll.end'),
            progress: this.endpoint.call(this, 'channel.poll.progress'),
        },
        prediction: {
            begin: this.endpoint.call(this, 'channel.prediction.begin'),
            end: this.endpoint.call(this, 'channel.prediction.end'),
            progress: this.endpoint.call(this, 'channel.prediction.progress'),
        },
        raid: this.endpoint.call(this, 'channel.raid'),
        shoutout: {
            create: this.endpoint.call(this, 'channel.shoutout.create'),
            receive: this.endpoint.call(this, 'channel.shoutout.receive'),
        },
        subscribe: this.endpoint.call(this, 'channel.subscribe'),
        update: this.endpoint.call(this, 'channel.update'),
    }
    stream = {
        online: this.endpoint.call(this, 'stream.online'),
        offline: this.endpoint.call(this, 'stream.offline'),
    }
}
