import { initializeCommunicationChannels } from './services/communication'
import { initializeRepository } from './services/registry'

export const init = () => {
  initializeRepository()
  initializeCommunicationChannels()
}
