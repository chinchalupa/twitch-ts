import { EventEmitter } from 'events'
import type { Subscription } from './subscription/subscription'
import type { AutomodMessageHoldEvent, AutomodMessageHoldSubscription } from './automod/message/hold/hold'
import type { AutomodMessageUpdateEvent, AutomodMessageUpdateSubscription } from './automod/message/update/update'
import type { AutomodSettingsUpdateEvent, AutomodSettingsUpdateSubscription } from './automod/settings/settings'
import type { AutomodTermsUpdateEvent, AutomodTermsUpdateSubscription } from './automod/terms/terms'
import type { ChannelUpdateEvent, ChannelUpdateSubscription } from './channel/update/update'
import type { ChannelBanEvent, ChannelBanSubscription } from './channel/ban/ban'
import type { ChannelAdBreakBeginEvent, ChannelAdBreakBeginSubscription } from './channel/adBreak/begin/begin'
import type { ChannelChatClearEvent, ChannelChatClearSubscription } from './channel/chat/clear/clear'
import type { ChannelChatClearUserMessagesEvent, ChannelChatClearUserMessagesSubscription } from './channel/chat/clearUserMessages/clearUserMessages'
import type { ChannelCheerEvent, ChannelCheerSubscription } from './channel/cheer/cheer'
import type { ChannelHypeTrainBeginEvent, ChannelHypeTrainBeginSubscription } from './channel/hypeTrain/begin/begin'
import type { ChannelHypeTrainEndEvent, ChannelHypeTrainEndSubscription } from './channel/hypeTrain/end/end'
import type { ChannelHypeTrainProgressEvent, ChannelHypeTrainProgressSubscription } from './channel/hypeTrain/progress/progress'
import type { ChannelChannelPointsCustomRewardUpdateEvent, ChannelChannelPointsCustomRewardUpdateSubscription } from './channel/channelPointsCustomReward/update/update'
import type { ChannelChannelPointsCustomRewardRedemptionAddEvent, ChannelChannelPointsCustomRewardRedemptionAddSubscription } from './channel/channelPointsCustomRewardRedemption/add/add'
import type { ChannelChatMessageEvent, ChannelChatMessageSubscription } from './channel/chat/message/message'
import type { ChannelChatMessageDeleteEvent, ChannelChatMessageDeleteSubscription } from './channel/chat/message_delete/message_delete'
import type { ChannelChatNotificationEvent, ChannelChatNotificationSubscription } from './channel/chat/notification/notification'
import type { ChannelChatUserMessageHoldEvent, ChannelChatUserMessageHoldSubscription } from './channel/chat/userMessageHold/userMessageHold'
import type { ChannelChatUserMessageUpdateEvent, ChannelChatUserMessageUpdateSubscription } from './channel/chat/userMessageUpdate/userMessageUpdate'
import type { ChannelChatSettingsUpdateEvent, ChannelChatSettingsUpdateSubscription } from './channel/chatSettings/update/update'
import type { ChannelFollowEvent, ChannelFollowSubscription } from './channel/follow/follow'
import type { ChannelPollBeginEvent, ChannelPollBeginSubscription } from './channel/poll/begin/begin'
import type { ChannelPollEndEvent, ChannelPollEndSubscription } from './channel/poll/end/end'
import type { ChannelPollProgressEvent, ChannelPollProgressSubscription } from './channel/poll/progress/progress'
import type { ChannelPredictionBeginEvent, ChannelPredictionBeginSubscription } from './channel/prediction/begin/begin'
import type { ChannelPredictionEndEvent, ChannelPredictionEndSubscription } from './channel/prediction/end/end'
import type { ChannelPredictionProgressEvent, ChannelPredictionProgressSubscription } from './channel/prediction/progress/progress'
import type { ChannelRaidEvent, ChannelRaidSubscription } from './channel/raid/raid'
import type { ChannelShoutoutCreateEvent, ChannelShoutoutCreateSubscription } from './channel/shoutout/create/create'
import type { ChannelShoutoutRecieveEvent, ChannelShoutoutRecieveSubscription } from './channel/shoutout/receive/receive'
import type { ChannelSubscribeEvent, ChannelSubscribeSubscription } from './channel/subscribe/subscribe'
import type { ChannelSubscriptionEndEvent, ChannelSubscriptionEndSubscription } from './channel/subscription/end/end'
import type { ChannelSubscriptionGiftEvent, ChannelSubscriptionGiftSubscription } from './channel/subscription/gift/gift'
import type { ChannelSubscriptionMessageEvent, ChannelSubscriptionMessageSubscription } from './channel/subscription/message/message'
import type { ChannelUnbanEvent, ChannelUnbanSubscription } from './channel/unban/unban'
import type { ChannelUnbanRequestCreateEvent, ChannelUnbanRequestCreateSubscription } from './channel/unbanRequest/create/create'
import type { StreamOfflineEvent, StreamOfflineSubscription } from './stream/offline/offline'
import type { StreamOnlineEvent, StreamOnlineSubscription } from './stream/online/online'

export type WebhookTransport = {
    method: 'webhook'
    callback: string
    secret?: string
}

// A map of Eventsub subscription types to their corresponding notification types.
export type NotificationEvent<
    Type extends Subscription<string, string, object>,
    Evt,
> = {
    subscription: Type
    event: Evt
}

// A map of Eventsub subscription types to their corresponding revocation types.
export type RevocationEvent<
    Type extends Subscription<string, string, object>,
> = {
    subscription: Type
}

export type EventsubNotificationEventMap = {
    'automod.message.hold': [NotificationEvent<AutomodMessageHoldSubscription, AutomodMessageHoldEvent>]
    'automod.message.update': [NotificationEvent<AutomodMessageUpdateSubscription, AutomodMessageUpdateEvent>]
    'automod.settings.update': [NotificationEvent<AutomodSettingsUpdateSubscription, AutomodSettingsUpdateEvent>]
    'automod.terms.update': [NotificationEvent<AutomodTermsUpdateSubscription, AutomodTermsUpdateEvent>]
    'channel.ad_break.begin': [NotificationEvent<ChannelAdBreakBeginSubscription, ChannelAdBreakBeginEvent>]
    'channel.ban': [NotificationEvent<ChannelBanSubscription, ChannelBanEvent>]
    'channel.follow': [NotificationEvent<ChannelFollowSubscription, ChannelFollowEvent>]
    'channel.channel_points_custom_reward.update': [NotificationEvent<ChannelChannelPointsCustomRewardUpdateSubscription, ChannelChannelPointsCustomRewardUpdateEvent>]
    'channel.channel_points_custom_reward_redemption.add': [NotificationEvent<ChannelChannelPointsCustomRewardRedemptionAddSubscription, ChannelChannelPointsCustomRewardRedemptionAddEvent>]
    'channel.chat.clear': [NotificationEvent<ChannelChatClearSubscription, ChannelChatClearEvent>,]
    'channel.chat.clear_user_messages': [NotificationEvent<ChannelChatClearUserMessagesSubscription, ChannelChatClearUserMessagesEvent>]
    'channel.chat.message': [NotificationEvent<ChannelChatMessageSubscription, ChannelChatMessageEvent>]
    'channel.chat.message_delete': [NotificationEvent<ChannelChatMessageDeleteSubscription, ChannelChatMessageDeleteEvent>]
    'channel.chat.notification': [NotificationEvent<ChannelChatNotificationSubscription, ChannelChatNotificationEvent>]
    'channel.chat.user_message_hold': [NotificationEvent<ChannelChatUserMessageHoldSubscription, ChannelChatUserMessageHoldEvent>]
    'channel.chat.user_message_update': [NotificationEvent<ChannelChatUserMessageUpdateSubscription, ChannelChatUserMessageUpdateEvent>]
    'channel.chat_settings.update': [NotificationEvent<ChannelChatSettingsUpdateSubscription, ChannelChatSettingsUpdateEvent>]
    'channel.cheer': [NotificationEvent<ChannelCheerSubscription, ChannelCheerEvent>]
    'channel.hype_train.begin': [NotificationEvent<ChannelHypeTrainBeginSubscription, ChannelHypeTrainBeginEvent>]
    'channel.hype_train.end': [NotificationEvent<ChannelHypeTrainEndSubscription, ChannelHypeTrainEndEvent>]
    'channel.hype_train.progress': [NotificationEvent<ChannelHypeTrainProgressSubscription, ChannelHypeTrainProgressEvent>,]
    'channel.poll.begin': [NotificationEvent<ChannelPollBeginSubscription, ChannelPollBeginEvent>]
    'channel.poll.end': [NotificationEvent<ChannelPollEndSubscription, ChannelPollEndEvent>]
    'channel.poll.progress': [NotificationEvent<ChannelPollProgressSubscription, ChannelPollProgressEvent>]
    'channel.prediction.begin': [NotificationEvent<ChannelPredictionBeginSubscription, ChannelPredictionBeginEvent>]
    'channel.prediction.end': [NotificationEvent<ChannelPredictionEndSubscription, ChannelPredictionEndEvent>]
    'channel.prediction.progress':[ NotificationEvent<ChannelPredictionProgressSubscription, ChannelPredictionProgressEvent>]
    'channel.raid': [NotificationEvent<ChannelRaidSubscription, ChannelRaidEvent>]
    'channel.shoutout.create': [NotificationEvent<ChannelShoutoutCreateSubscription, ChannelShoutoutCreateEvent>]
    'channel.shoutout.receive': [NotificationEvent<ChannelShoutoutRecieveSubscription, ChannelShoutoutRecieveEvent>]
    'channel.subscribe': [NotificationEvent<ChannelSubscribeSubscription, ChannelSubscribeEvent>]
    'channel.subscription.end': [NotificationEvent<ChannelSubscriptionEndSubscription, ChannelSubscriptionEndEvent>]
    'channel.subscription.gift': [NotificationEvent<ChannelSubscriptionGiftSubscription, ChannelSubscriptionGiftEvent>]
    'channel.subscription.message': [NotificationEvent<ChannelSubscriptionMessageSubscription, ChannelSubscriptionMessageEvent>]
    'channel.unban': [NotificationEvent<ChannelUnbanSubscription, ChannelUnbanEvent>]
    'channel.unban_request.create': [NotificationEvent<ChannelUnbanRequestCreateSubscription, ChannelUnbanRequestCreateEvent>]
    'channel.update': [NotificationEvent<ChannelUpdateSubscription, ChannelUpdateEvent>]
    'stream.online': [NotificationEvent<StreamOnlineSubscription, StreamOnlineEvent>]
    'stream.offline': [NotificationEvent<StreamOfflineSubscription, StreamOfflineEvent>]
}

export type EventsubRevocationEventMap = {
    'automod.message.hold': [RevocationEvent<AutomodMessageHoldSubscription>]
    'automod.message.update': [RevocationEvent<AutomodMessageUpdateSubscription>]
    'automod.settings.update': [RevocationEvent<AutomodSettingsUpdateSubscription>]
    'automod.terms.update': [RevocationEvent<AutomodTermsUpdateSubscription>]
    'channel.ad_break.begin': [RevocationEvent<ChannelAdBreakBeginSubscription>]
    'channel.ban': [RevocationEvent<ChannelBanSubscription>]
    'channel.follow': [RevocationEvent<ChannelFollowSubscription>]
    'channel.channel_points_custom_reward.update': [RevocationEvent<ChannelChannelPointsCustomRewardUpdateSubscription>]
    'channel.channel_points_custom_reward_redemption.add': [RevocationEvent<ChannelChannelPointsCustomRewardRedemptionAddSubscription>]
    'channel.chat.clear': [RevocationEvent<ChannelChatClearSubscription>]
    'channel.chat.clear_user_messages': [RevocationEvent<ChannelChatClearUserMessagesSubscription>]
    'channel.chat.message': [RevocationEvent<ChannelChatMessageSubscription>]
    'channel.chat.message_delete': [RevocationEvent<ChannelChatMessageDeleteSubscription>]
    'channel.chat.notification': [RevocationEvent<ChannelChatNotificationSubscription>]
    'channel.chat.user_message_hold': [RevocationEvent<ChannelChatUserMessageHoldSubscription>]
    'channel.chat.user_message_update': [RevocationEvent<ChannelChatUserMessageUpdateSubscription>]
    'channel.chat_settings.update': [RevocationEvent<ChannelChatSettingsUpdateSubscription>]
    'channel.cheer': [RevocationEvent<ChannelCheerSubscription>]
    'channel.hype_train.begin': [RevocationEvent<ChannelHypeTrainBeginSubscription>]
    'channel.hype_train.end': [RevocationEvent<ChannelHypeTrainEndSubscription>]
    'channel.hype_train.progress': [RevocationEvent<ChannelHypeTrainProgressSubscription>]
    'channel.poll.begin': [RevocationEvent<ChannelPollBeginSubscription>]
    'channel.poll.end': [RevocationEvent<ChannelPollEndSubscription>]
    'channel.poll.progress': [RevocationEvent<ChannelPollProgressSubscription>]
    'channel.prediction.begin': [RevocationEvent<ChannelPredictionBeginSubscription>]
    'channel.prediction.end': [RevocationEvent<ChannelPredictionEndSubscription>]
    'channel.prediction.progress': [RevocationEvent<ChannelPredictionProgressSubscription>]
    'channel.raid': [RevocationEvent<ChannelRaidSubscription>]
    'channel.shoutout.create': [RevocationEvent<ChannelShoutoutCreateSubscription>]
    'channel.shoutout.receive': [RevocationEvent<ChannelShoutoutRecieveSubscription>]
    'channel.subscribe': [RevocationEvent<ChannelSubscribeSubscription>]
    'channel.subscription.end': [RevocationEvent<ChannelSubscriptionEndSubscription>]
    'channel.subscription.gift': [RevocationEvent<ChannelSubscriptionGiftSubscription>]
    'channel.subscription.message': [RevocationEvent<ChannelSubscriptionMessageSubscription>]
    'channel.unban': [RevocationEvent<ChannelUnbanSubscription>]
    'channel.unban_request.create': [RevocationEvent<ChannelUnbanRequestCreateSubscription>]
    'channel.update': [RevocationEvent<ChannelUpdateSubscription>]
    'stream.online': [RevocationEvent<StreamOnlineSubscription>]
    'stream.offline': [RevocationEvent<StreamOfflineSubscription>]
}


export class SubscriptionEventEmitter<
    Evts extends Record<string, any[]>,
    Type extends keyof Evts,
    Args extends Evts[Type],
> {
    constructor(
        public readonly type: Type,
        protected readonly emitter: EventEmitter<any>,
    ) {}
    on(
        callback: (...args: Args) => void,
    ) {
        return this.emitter.on(this.type, callback)
    }
    off(
        callback: (...args: Args) => void,
    ) {
        return this.emitter.off(this.type, callback)
    }
    addListener(
        callback: (...args: Args) => void,
    ) {
        return this.emitter.addListener(this.type, callback)
    }
    removeListener(
        callback: (...args: Args) => void,
    ) {
        return this.emitter.removeListener(this.type, callback)
    }
    emit(
        ...args: Args
    ) {
        return this.emitter.emit(this.type, ...args)
    }
}
