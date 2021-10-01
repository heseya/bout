import { CommunicationChannel } from '../CommunicationChannel'

describe('', () => {
  it('Should create new empty channel', () => {
    const channel = new CommunicationChannel('test')
    expect(channel.name).toBe('test')
    expect((channel as any).listeners.length).toBe(0)
  })

  it('Should add listener', () => {
    const channel = new CommunicationChannel('test')
    const callback = jest.fn()
    channel.on('event', callback)
    expect((channel as any).listeners.length).toBe(1)

    const listener = (channel as any).listeners[0]
    expect(listener.callback).toBe(callback)
    expect(listener.event).toBe('event')
    expect(listener.usages).toBe(Infinity)
  })

  it('Should add single-use listener', () => {
    const channel = new CommunicationChannel('test')
    const callback = jest.fn()
    channel.once('event', callback)
    expect((channel as any).listeners.length).toBe(1)

    const listener = (channel as any).listeners[0]
    expect(listener.callback).toBe(callback)
    expect(listener.event).toBe('event')
    expect(listener.usages).toBe(1)
  })

  it('Should emit an event to the given event listeners', () => {
    const channel = new CommunicationChannel('test')

    const callback = jest.fn((data) => {
      expect(data).toBe('payload')
    })

    const callback2 = jest.fn()

    channel.on<string>('event', callback)
    channel.on<string>('event2', callback2)
    channel.emit('event', 'payload')

    expect((channel as any).listeners.length).toBe(2)

    expect(callback).toBeCalled()
    expect(callback2).not.toBeCalled()
  })

  it('Should remove single-use listeners after emit', () => {
    const channel = new CommunicationChannel('test')

    const callback = jest.fn((data) => {
      expect(data).toBe('payload')
    })

    channel.once<string>('event', callback)

    expect((channel as any).listeners.length).toBe(1)

    channel.emit('event', 'payload')

    expect((channel as any).listeners.length).toBe(0)
    expect(callback).toBeCalled()
  })

  it('Channel request should receive a response', async () => {
    const channel = new CommunicationChannel('test')

    channel.on('reqEvent', () => true)

    const response = await channel.request<boolean>('reqEvent')
    expect(response).toBe(true)
  })

  it('Channel async request should receive a response', async () => {
    const channel = new CommunicationChannel('test')

    channel.on('reqEvent', () => new Promise((resolve) => setTimeout(() => resolve(true), 100)))

    const response = await channel.request<boolean>('reqEvent')
    expect(response).toBe(true)
  })

  it('Channel request timeout ongoing request when no response', async () => {
    const channel = new CommunicationChannel('test')

    try {
      await channel.request('req')
      // Should not reach this point
      expect(false).toBe(true)
    } catch (e) {
      expect(e).toBeTruthy()
    }
  })
})
