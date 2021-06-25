import { getRegistry } from '../services/registry'

export const isParentApp = () => {
  return !!getRegistry()
}
