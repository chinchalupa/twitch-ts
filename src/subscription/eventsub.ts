// import type { BroadcasterUserCondition, FromBroadcasterUserCondition, ModeratorUserCondition, RewardCondition, ToBroadcasterUserCondition, UserCondition } from "../eventsub/subscription/conditions"
// import type { BroadcasterUserProps, CategoryProps, ChatterUser,FromBroadcasterUserProps, ModeratorUser, PrefixProps, RequesterUser, TargetUser, ToBroadcasterUserProps, UserProps } from "../eventsub/subscription/props"
// import type { AutomodMessage, AutomodTerms, ChannelDetails, AdBreak, ChatMessage, UserMessageDetails, Message, ChatNotificationMessage, ChannelChatSettings, ChannelSubscription, IsAnonymous, EmotePosition, Id, Session, StartedAt, EndedAt, CustomReward, RewardRedemption, Choice, Outcome, Charity, CurrencyAmount, Contribution } from "../types"
// import type { Subscription, WebhookTransport } from "./subscription"

// export type EventsubVersion = '1' | '2' | 'beta'

// export const EventsubSubscriptionTypes = [
//     'automod.message.hold',
//     'automod.message.update',
//     'automod.settings.update',
//     'automod.terms.update',
//     'channel.update',
//     'channel.follow',
//     'channel.ad_break.begin',
//     'channel.chat.clear',
//     'channel.chat.clear_user_messages',
//     'channel.chat.message',
//     'channel.chat.message_delete',
//     'channel.chat.notification',
//     'channel.chat_settings.update',
//     'channel.chat.user_message_hold',
//     'channel.chat.user_message_update',
//     'channel.subscribe',
//     'channel.subscription.end',
//     'channel.subscription.gift',
//     'channel.subscription.message',
//     'channel.cheer',
//     'channel.raid',
//     'channel.ban',
//     'channel.unban',
//     'channel.unban_request.create',
//     'channel.unban_request.resolve',
//     // 'channel.moderate',
//     'channel.moderator.add',
//     'channel.moderator.remove',
//     'channel.guest_star_session.begin',
//     'channel.guest_star_session.end',
//     'channel.guest_star_guest.update',
//     'channel.guest_star_settings.update',
//     'channel.channel_points_automatic_reward.add',
//     'channel.channel_points_custom_reward.add',
//     'channel.channel_points_custom_reward.update',
//     'channel.channel_points_custom_reward.remove',
//     'channel.channel_points_custom_reward_redemption.add',
//     'channel.channel_points_custom_reward_redemption.update',
//     'channel.poll.begin',
//     'channel.poll.progress',
//     'channel.poll.end',
//     'channel.prediction.begin',
//     'channel.prediction.progress',
//     'channel.prediction.lock',
//     'channel.prediction.end',
//     'channel.vip.add',
//     'channel.vip.remove',
//     'channel.charity_campaign.donate',
//     'channel.charity_campaign.start',
//     'channel.charity_campaign.progress',
//     'channel.charity_campaign.stop',
//     // 'conduit.shard.disabled',
//     // 'drop.entitlement.grant',
//     'extension.bits_transaction.create',
//     'channel.goal.begin',
//     'channel.goal.progress',
//     'channel.goal.end',
//     'channel.hype_train.begin',
//     'channel.hype_train.progress',
//     'channel.hype_train.end',
//     'channel.shield_mode.begin',
//     'channel.shield_mode.end',
//     'channel.shoutout.create',
//     'channel.shoutout.receive',
//     'stream.online',
//     'stream.offline',
//     'user.authorization.revoke',
//     'user.authorization.grant',
//     'user.update',
//     'user.whisper.message',
// ] as const

// export type EventsubSubscriptionEvents = {
//     'automod.message.hold': BroadcasterUserProps & UserProps & AutomodMessage
//     'automod.message.update': BroadcasterUserProps & UserProps & AutomodMessage
//     'automod.settings.update': AutomodSettings
//     'automod.terms.update': BroadcasterUserProps & ModeratorUser & AutomodTerms
//     'channel.update': BroadcasterUserProps & CategoryProps & ChannelDetails
//     'channel.follow': BroadcasterUserProps & UserProps & { followed_at: string }
//     'channel.ad_break.begin': BroadcasterUserProps & RequesterUser & AdBreak
//     'channel.chat.clear': BroadcasterUserProps
//     'channel.chat.clear_user_messages': BroadcasterUserProps & TargetUser
//     'channel.chat.message': BroadcasterUserProps & ChatterUser & ChatMessage & UserMessageDetails
//     'channel.chat.message_delete': BroadcasterUserProps & TargetUser & Message
//     'channel.chat.notification': BroadcasterUserProps & ChatterUser & Message & ChatNotificationMessage
//     'channel.chat_settings.update': BroadcasterUserProps & ChannelChatSettings
//     'channel.chat.user_message_hold': BroadcasterUserProps & UserProps & Message
//     'channel.chat.user_message_update': BroadcasterUserProps & UserProps & Message & { status: string }
//     'channel.subscribe': BroadcasterUserProps & UserProps & ChannelSubscription
//     'channel.subscription.end': BroadcasterUserProps & UserProps & ChannelSubscription
//     'channel.subscription.gift': BroadcasterUserProps & UserProps & { tier: string, total: number, cumulative_total?: number } & IsAnonymous
//     'channel.subscription.message': BroadcasterUserProps & UserProps & { message: { text: string, emotes: EmotePosition[] }, cumulative_months: number, streak_months: number,  duration_months: number }
//     'channel.cheer': BroadcasterUserProps & UserProps & IsAnonymous & { message: string, bits: number }
//     'channel.raid': PrefixProps<'from', BroadcasterUserProps> & ToBroadcasterUserProps & { viewers: number }
//     'channel.ban': UserProps & BroadcasterUserProps & ModeratorUser & { reason: string, banned_at: string, ends_at: string, is_permanent: boolean }
//     'channel.unban': UserProps & BroadcasterUserProps & ModeratorUser & { reason: string }
//     'channel.unban_request.create': Id & BroadcasterUserProps & UserProps & { text: string, created_at: string }
//     'channel.unban_request.resolve': Id & BroadcasterUserProps & ModeratorUser & UserProps & { resolution_text: string, status: string }
//     // 'channel.moderate': // TODO: Implement this event.
//     'channel.moderator.add': UserProps & BroadcasterUserProps
//     'channel.moderator.remove': UserProps & BroadcasterUserProps
//     'channel.guest_star_session.begin': BroadcasterUserProps & ModeratorUser & Session & StartedAt
//     'channel.guest_star_session.end': BroadcasterUserProps & ModeratorUser & Session & StartedAt & EndedAt
//     'channel.guest_star_guest.update': BroadcasterUserProps & ModeratorUser & PrefixProps<'guest', UserProps> & Session & { slot_id: string, status: string, host_video_enabled: boolean, host_audio_enabled: boolean, host_volume: number }
//     'channel.guest_star_settings.update': BroadcasterUserProps & { is_moderator_send_live_enabled: boolean, slot_count: number, is_browser_source_audio_enabled: boolean, group_layout: string }
//     'channel.channel_points_automatic_reward.add': BroadcasterUserProps & UserProps & { id: string, reward: { type: string, cost: number, unlocked_emote: null }, message: { text: string, emotes: {id: string, begin: number, end: number}[], user_input: string, redeemed_at: string}}
//     'channel.channel_points_custom_reward.add': BroadcasterUserProps & CustomReward
//     'channel.channel_points_custom_reward.update': Id & BroadcasterUserProps & CustomReward
//     'channel.channel_points_custom_reward.remove': Id & BroadcasterUserProps & CustomReward
//     'channel.channel_points_custom_reward_redemption.add': Id & BroadcasterUserProps & UserProps & RewardRedemption
//     'channel.channel_points_custom_reward_redemption.update': Id & BroadcasterUserProps & UserProps & RewardRedemption & { status: string }
//     'channel.poll.begin': Id & BroadcasterUserProps & StartedAt & { title: string, choices: Choice[], bits_voting: { is_enabled: boolean, amount_per_vote: number }, channel_points_voting: { is_enabled: boolean, amount_per_vote: number }, ends_at: string }
//     'channel.poll.progress': Id & BroadcasterUserProps & { title: string, choices: (Choice & { bits_votes: number, channel_points_votes: number, votes: number})[] }
//     'channel.poll.end': Id & BroadcasterUserProps & StartedAt & { title: string, choices: (Choice & { bits_votes: number, channel_points_votes: number, votes: number})[], bits_voting: { is_enabled: true, amount_per_vote: number }, channel_points_voting: { is_enabled: true, amount_per_vote: number }, status: string, ends_at: string }
//     'channel.prediction.begin': Id & BroadcasterUserProps & StartedAt & { title: string, outcomes: (Choice & { color: string })[], ends_at: string }
//     'channel.prediction.progress': Id & BroadcasterUserProps & StartedAt & { title: string, outcomes: Outcome[], locks_at: string }
//     'channel.prediction.lock': Id & BroadcasterUserProps & StartedAt & { title: string, outcomes: Outcome[], locked_at: string }
//     'channel.prediction.end': Id & BroadcasterUserProps & StartedAt & EndedAt & { title: string, winning_outcome_id: string, outcomes: Outcome[], status: 'resolved' | 'canceled' }
//     'channel.vip.add': BroadcasterUserProps & UserProps
//     'channel.vip.remove': BroadcasterUserProps & UserProps
//     'channel.charity_campaign.donate': Id & BroadcasterUserProps & UserProps & Charity & { amount: CurrencyAmount }
//     'channel.charity_campaign.start': Id & BroadcasterUserProps & Charity & StartedAt & { current_amount: CurrencyAmount, target_amount: CurrencyAmount }
//     'channel.charity_campaign.progress': Id & BroadcasterUserProps & Charity & StartedAt & { current_amount: CurrencyAmount, target_amount: CurrencyAmount }
//     'channel.charity_campaign.stop': Id & BroadcasterUserProps & Charity & { current_amount: CurrencyAmount, target_amount: CurrencyAmount }
//     // 'conduit.shard.disabled': { method: string, session_id: string, connected_at: string, disconnected_at: string }[]
//     // 'drop.entitlement.grant': Id & PrefixProps<'organization', Id>
//     'extension.bits_transaction.create': Id & BroadcasterUserProps & UserProps & { extension_client_id: string, product: { name: string, sku: string, bits: number, in_development: boolean } }
//     'channel.goal.begin': Id & BroadcasterUserProps & StartedAt & { type: string, description: string, current_amount: number, target_amount: number }
//     'channel.goal.progress': Id & BroadcasterUserProps & StartedAt & { type: string, description: string, current_amount: number, target_amount: number }
//     'channel.goal.end': Id & BroadcasterUserProps & StartedAt & { type: string, description: string, current_amount: number, target_amount: number, ended_at: string, is_achieved: boolean }
//     'channel.hype_train.begin': Id & BroadcasterUserProps & StartedAt & { total: number, progress: number, goal: number, top_contributions: Contribution[], last_contribution: Contribution, level: number, expires_at: string }
//     'channel.hype_train.progress': Id & BroadcasterUserProps & StartedAt & { level: number, total: number, progress: number, goal: number, top_contributions: Contribution[], last_contribution: Contribution, expires_at: string }
//     'channel.hype_train.end': Id & BroadcasterUserProps & { level: number, total: number, top_contributions: Contribution[], last_contribution: Contribution, started_at: string, ended_at: string, cooldown_ends_at: string }
//     'channel.shield_mode.begin': BroadcasterUserProps & StartedAt
//     'channel.shield_mode.end': BroadcasterUserProps & EndedAt
//     'channel.shoutout.create': BroadcasterUserProps & ModeratorUser & ToBroadcasterUserProps & StartedAt & { viewer_count: number, cooldown_ends_at: string, target_cooldown_ends_at: string }
//     'channel.shoutout.receive': BroadcasterUserProps & FromBroadcasterUserProps & StartedAt & { viewer_count: number }
//     'stream.online': Id & BroadcasterUserProps & StartedAt & { type: string }
//     'stream.offline': BroadcasterUserProps
//     'user.authorization.grant': UserProps & { client_id: string }
//     'user.authorization.revoke': UserProps & { client_id: string }
//     'user.update': UserProps & { email: string, email_verified: boolean, description: string }
//     'user.whisper.message': PrefixProps<'from', UserProps> & PrefixProps<'to', UserProps> & { whisper_id: string, whisper: { text: string }}
// }

// export interface EventsubSubscriptionConditions {
//     'automod.message.hold': BroadcasterUserCondition & ModeratorUserCondition
//     'automod.message.update': BroadcasterUserCondition & ModeratorUserCondition
//     'automod.settings.update': BroadcasterUserCondition & ModeratorUserCondition
//     'automod.terms.update': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.update': BroadcasterUserCondition
//     'channel.follow': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.ad_break.begin': { broadcaster_id: string }
//     'channel.chat.clear': BroadcasterUserCondition & UserCondition
//     'channel.chat.clear_user_messages': BroadcasterUserCondition & UserCondition
//     'channel.chat.message': BroadcasterUserCondition & UserCondition
//     'channel.chat.message_delete': BroadcasterUserCondition & UserCondition
//     'channel.chat.notification': BroadcasterUserCondition & UserCondition
//     'channel.chat_settings.update': BroadcasterUserCondition & UserCondition
//     'channel.chat.user_message_hold': BroadcasterUserCondition & UserCondition
//     'channel.chat.user_message_update': BroadcasterUserCondition & UserCondition
//     'channel.subscribe': BroadcasterUserCondition
//     'channel.subscription.end': BroadcasterUserCondition
//     'channel.subscription.gift': BroadcasterUserCondition
//     'channel.subscription.message': BroadcasterUserCondition
//     'channel.cheer': BroadcasterUserCondition
//     'channel.raid': FromBroadcasterUserCondition | ToBroadcasterUserCondition
//     'channel.ban': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.unban': BroadcasterUserCondition
//     'channel.unban_request.create': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.unban_request.resolve': BroadcasterUserCondition & ModeratorUserCondition
//     // 'channel.moderate': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.moderator.add': BroadcasterUserCondition
//     'channel.moderator.remove': BroadcasterUserCondition
//     'channel.guest_star_session.begin': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.guest_star_session.end': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.guest_star_guest.update': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.guest_star_settings.update': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.channel_points_automatic_reward.add': BroadcasterUserCondition
//     'channel.channel_points_custom_reward.add': BroadcasterUserCondition & RewardCondition
//     'channel.channel_points_custom_reward.update': BroadcasterUserCondition & RewardCondition
//     'channel.channel_points_custom_reward.remove': BroadcasterUserCondition & RewardCondition
//     'channel.channel_points_custom_reward_redemption.add': BroadcasterUserCondition & RewardCondition
//     'channel.channel_points_custom_reward_redemption.update': BroadcasterUserCondition & RewardCondition
//     'channel.poll.begin': BroadcasterUserCondition
//     'channel.poll.progress': BroadcasterUserCondition
//     'channel.poll.end': BroadcasterUserCondition
//     'channel.prediction.begin': BroadcasterUserCondition
//     'channel.prediction.progress': BroadcasterUserCondition
//     'channel.prediction.lock': BroadcasterUserCondition
//     'channel.prediction.end': BroadcasterUserCondition
//     'channel.vip.add': BroadcasterUserCondition
//     'channel.vip.remove': BroadcasterUserCondition
//     'channel.charity_campaign.donate': BroadcasterUserCondition
//     'channel.charity_campaign.start': BroadcasterUserCondition
//     'channel.charity_campaign.progress': BroadcasterUserCondition
//     'channel.charity_campaign.stop': BroadcasterUserCondition
//     // 'conduit.shard.disabled': BroadcasterUserCondition
//     // 'drop.entitlement.grant': BroadcasterUserCondition
//     'extension.bits_transaction.create': BroadcasterUserCondition
//     'channel.goal.begin': BroadcasterUserCondition
//     'channel.goal.progress': BroadcasterUserCondition
//     'channel.goal.end': BroadcasterUserCondition
//     'channel.hype_train.begin': BroadcasterUserCondition
//     'channel.hype_train.progress': BroadcasterUserCondition
//     'channel.hype_train.end': BroadcasterUserCondition
//     'channel.shield_mode.begin': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.shield_mode.end': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.shoutout.create': BroadcasterUserCondition & ModeratorUserCondition
//     'channel.shoutout.receive': BroadcasterUserCondition & ModeratorUserCondition
//     'stream.online': BroadcasterUserCondition
//     'stream.offline': BroadcasterUserCondition
//     'user.authorization.grant': BroadcasterUserCondition
//     'user.authorization.revoke': BroadcasterUserCondition
//     'user.update': UserCondition
//     'user.whisper.message': UserCondition
// }

// const EventsubSubscriptionVersionMap: Record<typeof EventsubSubscriptionTypes[number], EventsubVersion> = {
//     'automod.message.hold': '1',
//     'automod.message.update': '1',
//     'automod.settings.update': '1',
//     'automod.terms.update': '1',
//     'channel.update': '2',
//     'channel.follow': '2',
//     'channel.ad_break.begin': '1',
//     'channel.chat.clear': '1',
//     'channel.chat.clear_user_messages': '1',
//     'channel.chat.message': '1',
//     'channel.chat.message_delete': '1',
//     'channel.chat.notification': '1',
//     'channel.chat_settings.update': '1',
//     'channel.chat.user_message_hold': '1',
//     'channel.chat.user_message_update': 'beta',
//     'channel.subscribe': '1',
//     'channel.subscription.end': '1',
//     'channel.subscription.gift': '1',
//     'channel.subscription.message': '1',
//     'channel.cheer': '1',
//     'channel.raid': '1',
//     'channel.ban': '1',
//     'channel.unban': '1',
//     'channel.unban_request.create': '1',
//     'channel.unban_request.resolve': '1',
//     // 'channel.moderate': 'beta',
//     'channel.moderator.add': '1',
//     'channel.moderator.remove': '1',
//     'channel.guest_star_session.begin': 'beta',
//     'channel.guest_star_session.end': 'beta',
//     'channel.guest_star_guest.update': 'beta',
//     'channel.guest_star_settings.update': 'beta',
//     'channel.channel_points_automatic_reward.add': 'beta',
//     'channel.channel_points_custom_reward.add': '1',
//     'channel.channel_points_custom_reward.update': '1',
//     'channel.channel_points_custom_reward.remove': '1',
//     'channel.channel_points_custom_reward_redemption.add': '1',
//     'channel.channel_points_custom_reward_redemption.update': '1',
//     'channel.poll.begin': '1',
//     'channel.poll.progress': '1',
//     'channel.poll.end': '1',
//     'channel.prediction.begin': '1',
//     'channel.prediction.progress': '1',
//     'channel.prediction.lock': '1',
//     'channel.prediction.end': '1',
//     'channel.vip.add': 'beta',
//     'channel.vip.remove': 'beta',
//     'channel.charity_campaign.donate': '1',
//     'channel.charity_campaign.start': '1',
//     'channel.charity_campaign.progress': '1',
//     'channel.charity_campaign.stop': '1',
//     // 'conduit.shard.disabled': '1',
//     // 'drop.entitlement.grant': '1',
//     'extension.bits_transaction.create': '1',
//     'channel.goal.begin': '1',
//     'channel.goal.progress': '1',
//     'channel.goal.end': '1',
//     'channel.hype_train.begin': '1',
//     'channel.hype_train.progress': '1',
//     'channel.hype_train.end': '1',
//     'channel.shield_mode.begin': '1',
//     'channel.shield_mode.end': '1',
//     'channel.shoutout.create': '1',
//     'channel.shoutout.receive': '1',
//     'stream.online': '1',
//     'stream.offline': '1',
//     'user.authorization.grant': '1',
//     'user.authorization.revoke': '1',
//     'user.update': '1',
//     'user.whisper.message': 'beta',
// } as const


// export type EventsubSubscription<T extends typeof EventsubSubscriptionTypes[number]> =
//     Subscription<T, typeof EventsubSubscriptionVersionMap[T], EventsubSubscriptionConditions[T]>

// DO NOT USE. DOES NOT WORK FOR REVOKE TYPES.
// export interface EventsubEvent<Subscription, Event> {
//     subscription: Subscription
//     event: Event
// }

// export interface EventsubEventCallback<T, U> {
//     (data: EventsubEvent<T, U>): void
// }