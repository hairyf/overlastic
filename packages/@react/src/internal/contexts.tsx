import { noop } from '@overlays/core'
import type { FC } from 'react'
import { createContext } from 'react'

export const ScriptsContext = createContext({
  reject: noop,
  resolve: noop,
  setVisible: noop,
  vanish: noop,
  visible: false,
  in_dec: true,
} as any)

export const InstancesContext = createContext<{
  render: (instance: FC, props: any) => void
  vanish: (instance: FC) => void
}>({} as any)

InstancesContext.displayName = 'OverlayInstancesContext'
ScriptsContext.displayName = 'OverlayScriptsContext'
