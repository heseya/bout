import { Channel } from '../interfaces/Channels'
import { LifecycleEvents } from '../interfaces/LifecycleEvents'
import { MicroApp } from '../interfaces/MicroApp'

import { openCommunicationChannel as openChannel } from '../services/communication'

export const onRegistered = (callback: (app: MicroApp) => void) => {
  openChannel(Channel.Broadcast).on<MicroApp>(LifecycleEvents.Registered, (app) => {
    if (app) {
      callback(app)
    }
  })
}
