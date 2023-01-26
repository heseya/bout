import { emitLifecycleEvent } from './lifecycle'
import { getRegistry } from './registry'
import { LifecycleEvents } from '../interfaces/LifecycleEvents'

export const uninstallApp = (host: string): void => {
  const registry = getRegistry()
  const index = registry.findIndex((app) => app.host === host)

  // TODO: script and styles cleanup

  if (index === -1) throw new Error('App not found')

  registry.splice(index, 1)

  emitLifecycleEvent(LifecycleEvents.Uninstalled, host)
}
