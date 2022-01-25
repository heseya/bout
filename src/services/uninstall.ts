import { emitLifecycleEvent, getRegistry, LifecycleEvents } from '..'

export const uninstallApp = (host: string): void => {
  const registry = getRegistry()
  const index = registry.findIndex((app) => app.host === host)

  // TODO: script and styles cleanup

  if (index === -1) throw new Error('App not found')

  registry.splice(index, 1)

  emitLifecycleEvent(LifecycleEvents.Uninstalled, host)
}
