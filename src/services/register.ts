import { MicroApp } from '../interfaces/MicroApp'
import { Channel } from '../interfaces/Channels'
import { LifecycleEvents } from '../interfaces/LifecycleEvents'

import { getRegistry } from './registry'
import { openCommunicationChannel as openChannel } from './communication'
import { isParentApp } from '../utils/index'

export const registerMicroApp = <T>(microApp: MicroApp<T>) => {
  if (!isParentApp()) {
    console.warn('Parent App not found, registration is aborted')
    return
  }

  const registry = getRegistry()
  registry.push(microApp)

  openChannel(Channel.Broadcast).emit(LifecycleEvents.Registered, microApp)
}
