import { CommunicationChannel } from '../models/CommunicationChannel'

declare global {
  interface Window {
    $channels: CommunicationChannel[]
  }
}

export const openCommunicationChannel = (channelName: string): CommunicationChannel => {
  if (!window.$channels) window.$channels = []

  const channel = window.$channels.find(({ name }) => channelName === name)
  if (channel) return channel

  const newChannel = new CommunicationChannel(channelName)
  window.$channels.push(newChannel)
  return newChannel
}
