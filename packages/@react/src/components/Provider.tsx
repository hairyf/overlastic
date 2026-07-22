/* eslint-disable react/no-unstable-context-value */
/* eslint-disable react/no-array-index-key */
import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import { InstancesContext } from '../internal'

export interface Instance {
  Instance: FC<any>
  props: any
}

export interface OverlaysProviderProps {
  children: ReactNode
}

export function OverlaysProvider(props: OverlaysProviderProps) {
  const [instances, setInstances] = useState<Instance[]>([])

  function render(Instance: FC<any>, props: any) {
    setInstances(instances => [...instances, { Instance, props }])
  }

  function vanish(instance: FC<any>) {
    setInstances(instances => [...instances.filter(({ Instance }) => instance.name !== Instance.name)])
  }
  return (
    <InstancesContext.Provider value={{ render, vanish }}>
      {instances.map(({ Instance, props }, index) => <Instance key={index} {...props} />)}
      {props.children}
    </InstancesContext.Provider>
  )
}
