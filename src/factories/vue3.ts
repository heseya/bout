import { App as Vue3App } from 'vue'

import { LifecycleEvents } from '../interfaces'
import { MicroApp } from '../interfaces/MicroApp'

import { emitLifecycleEvent } from '../services/lifecycle'

export const createVue3MicroApp = (name: string, appFactory: () => Vue3App): MicroApp<Vue3App> => {
  let app = null as Vue3App | null

  const appObject = {
    name,

    // mount micro frontend function
    mount(containerId: string) {
      app = appFactory()

      console.log('Function: mount =>', containerId)

      app.mount(`#${containerId}`)

      emitLifecycleEvent(LifecycleEvents.Mounted, appObject)
    },

    // unmount micro frontend function
    unmount(containerId: string) {
      if (!app) return

      console.log('Function: unmount =>', containerId)
      app.unmount()
      app = null

      emitLifecycleEvent(LifecycleEvents.Unmounted, appObject)
    },

    getApp() {
      return app
    },
  }

  return appObject
}
