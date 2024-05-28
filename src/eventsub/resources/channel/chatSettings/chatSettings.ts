import { EventsubBase, EventsubEmitter } from '../../resource'
import { ChannelChatSettingsUpdateEvent, ChannelChatSettingsUpdateSubscription } from './update/update'

export class ChannelChatSettings extends EventsubBase {
    update = new EventsubEmitter<ChannelChatSettingsUpdateSubscription, ChannelChatSettingsUpdateEvent>('channel.chat_settings.update', this.eventEmitter)
}