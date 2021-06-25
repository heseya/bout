import { MicroApp } from '../interfaces/MicroApp'
import { Registry } from '../interfaces/Registry'

declare global {
  interface Window {
    $microApps: Registry
  }
}

export const initializeRepository = () => {
  if (!window.$microApps) window.$microApps = []
}

export const findAppByHost = (host: string): MicroApp | undefined => {
  return window.$microApps.find((app) => app.host === host)
}

export const findAppByName = (name: string): MicroApp | undefined => {
  return window.$microApps.find((app) => app.name === name)
}

export const getRegistry = (): Registry => window.$microApps
