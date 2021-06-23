import { MicroApp } from '../interfaces/MicroApp'
import { findAppByName } from '../registry'

export const onRegister = (callback: (app: MicroApp) => void) => {
  const registerChannel = new BroadcastChannel('register')
  registerChannel.onmessage = (ev) => {
    const appName = ev.data.appName
    const app = findAppByName(appName)

    if (app) {
      callback(app)
    }

    registerChannel.close()
  }
}
