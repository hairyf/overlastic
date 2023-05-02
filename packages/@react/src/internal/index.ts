import type { FC } from 'react'

import { noop } from '@overlays/core'
import { createContext } from 'react'
import type { OverlayMeta } from '../composable'

export const defineProviderComponent = (component: FC) => {
  return ({ '--': component })['--']
}

export const Context = createContext<OverlayMeta>({
  reject: noop,
  resolve: noop,
  setVisible: noop,
  vanish: noop,
  visible: false,
  __in_dec: true,
} as any)

Context.displayName = 'OverlayContext'
