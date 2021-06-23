import { App as Vue3App } from 'vue'
import { MicroApp } from '../interfaces/MicroApp'

export const createVue3MicroApp = (name: string, appFactory: () => Vue3App): MicroApp<Vue3App> => {
  let app = null as Vue3App | null

  return {
    name,

    // mount micro frontend function
    mount(containerId: string) {
      app = appFactory()

      console.log('Function: mount =>', containerId)

      const div = document.createElement('div')
      div.id = 'test-app'
      document.getElementById(containerId)!.appendChild(div)
      app.mount('#test-app')
    },

    // unmount micro frontend function
    unmount(containerId: string) {
      if (!app) return

      console.log('Function: unmount =>', containerId)
      app.unmount()
      app = null
    },

    getApp() {
      return app
    },
  }
}
