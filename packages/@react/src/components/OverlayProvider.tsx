import type { FC, PropsWithChildren } from 'react'
import { useState } from 'react'
import { InstancesContext } from '../internal'

export interface Instance {
  Instance: FC<any>
  props: any
}

export function OverlayProvider(props: PropsWithChildren) {
  const [instances, setInstances] = useState<Instance[]>([])

  function render(Instance: FC<any>, props: any) {
    setInstances(instances => [...instances, { Instance, props }])
  }

  function vanish(instance: FC<any>) {
    setInstances(instances => [...instances.filter(({ Instance }) => instance !== Instance)])
  }
  return (
    <InstancesContext.Provider value={{ render, vanish }}>
      {instances.map(({ Instance, props }, index) => <Instance key={index} {...props} />)}
      {props.children}
    </InstancesContext.Provider>
  )
}
