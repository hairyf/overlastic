import type { FC } from 'react'
import { noop } from '@overlastic/core'
import { createContext } from 'react'

export const ScriptsContext = createContext({
  reject: noop,
  resolve: noop,
  change: noop,
  vanish: noop,
  visible: false,
  __is_declarative: true,
} as any)

export const InstancesContext = createContext<{
  render: (instance: FC, props: any) => void
  vanish: (instance: FC) => void
}>({} as any)

InstancesContext.displayName = 'OverlayInstancesContext'
ScriptsContext.displayName = 'OverlayScriptsContext'
