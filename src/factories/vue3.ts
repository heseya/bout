import { LifecycleEvents } from '../interfaces'
import { MicroApp } from '../interfaces/MicroApp'

import { emitLifecycleEvent } from '../services/lifecycle'

interface Vue3App {
  mount(rootContainer: any, isHydrate?: boolean, isSVG?: boolean): any
  unmount(): void
}

export const createVue3MicroApp = (name: string, appFactory: () => Vue3App): MicroApp<Vue3App> => {
  let app = null as Vue3App | null

  const microApp = {
    name,

    // mount micro frontend function
    mount(containerId: string) {
      app = appFactory()

      console.log('Function: mount =>', containerId)

      app.mount(`#${containerId}`)

      emitLifecycleEvent(LifecycleEvents.Mounted, microApp)
    },

    // unmount micro frontend function
    unmount(containerId: string) {
      if (!app) return

      console.log('Function: unmount =>', containerId)
      app.unmount()
      app = null

      emitLifecycleEvent(LifecycleEvents.Unmounted, microApp)
    },

    getApp() {
      return app
    },
  }

  return microApp
}
