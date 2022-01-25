import { Mountable } from './Mountable'

export interface MicroApp<Instance = unknown> {
  name: string
  host?: string
  mount(container: Mountable): void
  unmount(): void
  getApp(): Instance | null
}
