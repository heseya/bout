import { MicroApp } from '../interfaces/MicroApp'
import { LifecycleEvents } from '../interfaces/LifecycleEvents'

import { getRegistry } from './registry'
import { isParentApp } from '../utils/index'
import { emitLifecycleEvent } from './lifecycle'

export const registerMicroApp = <T>(microApp: MicroApp<T>): void => {
  if (!isParentApp()) {
    // eslint-disable-next-line no-console
    console.warn('Parent App not found, registration is aborted')
    return
  }

  const registry = getRegistry()
  registry.push(microApp)

  emitLifecycleEvent(LifecycleEvents.Registered, microApp)
}
