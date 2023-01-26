import { Channel } from '../interfaces/Channels'
import { LifecycleEvents } from '../interfaces/LifecycleEvents'
import { MicroApp } from '../interfaces/MicroApp'

import { openCommunicationChannel as openChannel } from './communication'

const createWatcher = <T>(event: string, onlyOnce = false, channel = Channel.Broadcast) => {
  return (callback: (payload: T) => void) => {
    openChannel(channel)[onlyOnce ? 'once' : 'on']<T>(event, (payload) => {
      callback(payload)
    })
  }
}

export const onRegistered = createWatcher<MicroApp>(LifecycleEvents.Registered, true)
export const onInstalled = createWatcher<string>(LifecycleEvents.Installed)
export const onMounted = createWatcher<MicroApp>(LifecycleEvents.Mounted)
export const onUnmounted = createWatcher<MicroApp>(LifecycleEvents.Unmounted)

export const emitLifecycleEvent = <T>(event: LifecycleEvents, payload: T): void => {
  openChannel(Channel.Broadcast).emit(event, payload)
}
