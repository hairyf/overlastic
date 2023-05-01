import type { FC } from 'react'

import { noop } from '@overlays/core'
import { createContext } from 'react'
import type { OverlayMeta } from '../composable'

export const defineProviderComponent = (component: FC) => {
  return ({ '--': component })['--']
}

export const OverlayContext = createContext<OverlayMeta>({
  reject: noop,
  resolve: noop,
  setVisible: noop,
  vanish: noop,
  visible: false,
  inDec: true,
})

OverlayContext.displayName = 'OverlayContext'
