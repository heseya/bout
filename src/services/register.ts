import { MicroApp } from '../interfaces/MicroApp'
import { getRegistry } from '../registry'
import { isParentApp } from '../utils/index'

export const registerMicroApp = <T>(microApp: MicroApp<T>) => {
  if (!isParentApp()) {
    console.warn('Parent App not found, registration is aborted')
    return
  }
  const registry = getRegistry()
  registry.push(microApp)

  const channel = new BroadcastChannel('register')
  channel.postMessage({
    event: 'register',
    appName: microApp.name,
  })
}
