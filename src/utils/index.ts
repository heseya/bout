import { getRegistry } from '../registry'

export const isParentApp = () => {
  return !!getRegistry()
}
