import { LifecycleEvents } from '../interfaces'
import { MicroApp } from '../interfaces/MicroApp'
import { Mountable } from '../interfaces/Mountable'

import { emitLifecycleEvent } from '../services/lifecycle'

interface Vue3App {
  mount(rootContainer: Mountable, isHydrate?: boolean, isSVG?: boolean): any
  unmount(): void
}

export const createVue3MicroApp = (name: string, appFactory: () => Vue3App): MicroApp<Vue3App> => {
  let app: Vue3App | null = null
  let appContainer: Mountable | null = null

  const microApp: MicroApp<Vue3App> = {
    name,

    // mount micro frontend function
    mount(container: Mountable) {
      app = appFactory()
      appContainer = container

      console.log('Function: mount =>', container)

      app.mount(container)

      emitLifecycleEvent(LifecycleEvents.Mounted, microApp)
    },

    // unmount micro frontend function
    unmount() {
      if (!app) return

      console.log('Function: unmount =>', appContainer)

      app.unmount()

      app = null
      appContainer = null

      emitLifecycleEvent(LifecycleEvents.Unmounted, microApp)
    },

    getApp() {
      return app
    },
  }

  return microApp
}
