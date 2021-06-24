import { MicroApp } from '../interfaces/MicroApp'
import { onRegister } from '../hooks/onRegister'

export const installApp = async (host: string): Promise<MicroApp> => {
  const { document } = window

  const scriptId = `micro-frontend-script-${host}`
  if (document.getElementById(scriptId)) {
    return Promise.reject(`App ${host} is aleady installed`)
  }

  const response = await fetch(`${host}/asset-manifest.json`)
  const manifest = await response.json()

  const script = document.createElement('script')
  script.id = scriptId
  script.type = 'module'
  script.crossOrigin = ''
  const appSrc =
    manifest['index.js'] ||
    manifest['bundle.js'] ||
    manifest['main.js'] ||
    manifest['main.umd.min.js']

  script.src = `${host}${appSrc}`
  document.head.appendChild(script)

  return new Promise((resolve) => {
    onRegister((app) => {
      // app.host = host
      resolve(app)
    })
  })
}
