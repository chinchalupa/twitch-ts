import { EventsubBase, EventsubEmitter } from '../../resource'
import type { ChannelHypeTrainBeginEvent, ChannelHypeTrainBeginSubscription } from './begin/begin'
import type { ChannelHypeTrainEndSubscription, ChannelHypeTrainEndEvent } from './end/end'
import type { ChannelHypeTrainProgressSubscription, ChannelHypeTrainProgressEvent } from './progress/progress'

/**
 * Namespace for all hype train events.
 */
export class ChannelHypeTrain extends EventsubBase {
    begin = new EventsubEmitter<ChannelHypeTrainBeginSubscription, ChannelHypeTrainBeginEvent>('channel.hype_train.begin', this.eventEmitter)
    end = new EventsubEmitter<ChannelHypeTrainEndSubscription, ChannelHypeTrainEndEvent>('channel.hype_train.end', this.eventEmitter)
    progress = new EventsubEmitter<ChannelHypeTrainProgressSubscription, ChannelHypeTrainProgressEvent>('channel.hype_train.progress', this.eventEmitter)
}
