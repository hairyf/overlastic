import { noop } from '@unoverlays/utils'
import { createContext } from 'react'
import type { OverlayMeta } from '../hooks'

export const OverlayContext = createContext<OverlayMeta>({
  reject: noop,
  resolve: noop,
  setVisible: noop,
  vanish: noop,
  visible: false,
  inJsx: true,
  promise: undefined,
})

OverlayContext.displayName = 'OverlayContext'
