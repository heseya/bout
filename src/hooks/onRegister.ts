import { findAppByName } from '../registry'

export const onRegister = (callback: (app: any) => void) => {
  const registerChannel = new BroadcastChannel('register')
  registerChannel.onmessage = (ev) => {
    const appName = ev.data.appName
    const app = findAppByName(appName)

    callback(app)

    registerChannel.close()
  }
}
