import { LifecycleEvents } from '../interfaces'
import { MicroApp } from '../interfaces/MicroApp'
import { Mountable } from '../interfaces/Mountable'

import { emitLifecycleEvent } from '../services/lifecycle'

interface Vue3App {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      // eslint-disable-next-line no-console
      console.log('Function: mount =>', container)

      app.mount(container)

      emitLifecycleEvent(LifecycleEvents.Mounted, microApp)
    },

    // unmount micro frontend function
    unmount() {
      if (!app) return

      // eslint-disable-next-line no-console
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
