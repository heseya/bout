import { getRegistry } from '../services/registry'

export const isParentApp = (): boolean => {
  return !!getRegistry()
}
