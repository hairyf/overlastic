import type { FC } from 'react'

import { noop } from '@overlays/core'
import { createContext } from 'react'
import type { UseOverlayReturn } from '../composable'

export const defineProviderComponent = (component: FC) => {
  return ({ '--': component })['--']
}

export const Context = createContext<UseOverlayReturn>({
  reject: noop,
  resolve: noop,
  setVisible: noop,
  vanish: noop,
  visible: false,
  in_dec: true,
} as any)

Context.displayName = 'OverlayContext'
