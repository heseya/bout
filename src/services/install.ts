import { MicroApp } from '../interfaces/MicroApp'
import { onRegistered, emitLifecycleEvent } from './lifecycle'
import { LifecycleEvents } from '../interfaces'

const REGISTER_TIMEOUT = 5000

type Manifest = Record<string, string>

const createScriptElement = (host: string, id: string, manifest: Manifest) => {
  const script = document.createElement('script')
  script.id = id
  script.type = 'module'
  script.crossOrigin = ''
  const appSrc =
    manifest['index.js'] ||
    manifest['bundle.js'] ||
    manifest['main.js'] ||
    manifest['main.umd.min.js']

  // TODO: remove Math.random? Now it forces the scripts to run after attaching them to DOM, how to avoid this?
  script.src = `${host}/${appSrc}?${Math.random()}`

  return script
}

const createStyleElement = (host: string, id: string, manifest: Manifest) => {
  const link = window.document.createElement('link')
  link.id = id
  const appSrc = manifest['style.css'] || manifest['main.css']

  if (!appSrc) return null

  link.rel = 'stylesheet'
  // TODO: remove Math.random?
  link.href = `${host}/${appSrc}?${Math.random()}`

  return link
}

export const installApp = async (
  host: string,
  target: Element = window.document.head,
): Promise<MicroApp> => {
  const id = Math.round(Math.random() * 100000)
  const scriptId = `micro-frontend-js-${id}`
  const styleLinkId = `micro-frontend-css-${id}`

  if (target.querySelector(`#${scriptId}`)) {
    return Promise.reject(`App ${host} is aleady installed`)
  }

  // Trim host string
  const trimmedHost = host.endsWith('/') ? host.slice(0, -1) : host

  const response = await fetch(`${trimmedHost}/asset-manifest.json`)
  const manifest: Manifest = await response.json()

  const script = createScriptElement(trimmedHost, scriptId, manifest)
  const style = createStyleElement(trimmedHost, styleLinkId, manifest)

  target.appendChild(script)
  if (style) target.appendChild(style)

  emitLifecycleEvent(LifecycleEvents.Installed, host)

  return new Promise((resolve, reject) => {
    onRegistered((app) => {
      // TODO: check if registered app is the same as installed app !!!!
      // Otherwise, when multiple apps are installed at the same time, they gonna be mixed up
      app.host = host
      resolve(app)
    })

    setTimeout(() => {
      reject(new Error('App was installed, but not registered'))
    }, REGISTER_TIMEOUT)
  })
}
