type EventCallback<Payload = any> = (payload: Payload) => void

interface EventListener {
  event: string
  usages: number
  callback: EventCallback
}

export class CommunicationChannel {
  name: string
  private listeners: EventListener[] = []
  private timeout: number

  constructor(channelName: string, timeout = 2000) {
    this.name = channelName
    this.timeout = timeout
  }

  /**
   * Allows listening to an event every time it gets emitted
   */
  on<Payload>(event: string, callback: EventCallback<Payload>): void {
    this.listeners.push({ event, callback, usages: Infinity })
  }

  /**
   * Allows listening to an event only once.
   */
  once<Payload>(event: string, callback: EventCallback<Payload>): void {
    this.listeners.push({ event, callback, usages: 1 })
  }

  /**
   * Emits an event to all listeners that are listening to it.
   */
  emit<T = unknown>(event: string, payload?: T): void {
    const eventListeners = this.listeners.filter((l) => l.event === event)

    eventListeners.forEach((listener) => {
      this.emit(`re:${listener.event}`, listener.callback(payload))

      return { ...listener, usages: listener.usages - 1 }
    })

    this.listeners = this.listeners
      .map((listener) => {
        return eventListeners.find((l) => l === listener)
          ? { ...listener, usages: listener.usages - 1 }
          : listener
      })
      .filter((l) => l.usages > 0)
  }

  /**
   * Emits an event, and wait for the response to it
   */
  async request<T = unknown>(event: string, payload?: unknown): Promise<T> {
    return new Promise((resolve, reject) => {
      this.once<T>(`re:${event}`, (response) => resolve(response))
      this.emit(event, payload)

      setTimeout(() => {
        reject(new Error(`Timeout while waiting for response to ${event}`))
      }, this.timeout)
    })
  }
}
