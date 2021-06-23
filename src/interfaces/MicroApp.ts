export interface MicroApp<Instance = unknown> {
  name: string
  host?: string
  mount(containerId: string): void
  unmount(containerId: string): void
  getApp(): Instance | null
}
