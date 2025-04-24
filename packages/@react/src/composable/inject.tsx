import type { FC } from 'react'
import { createConstructor } from '@overlastic/core'
import { pascalCase } from 'pascal-case'
import { useContext } from 'react'
import { defineAnonymousComponent, InstancesContext, ScriptsContext } from '../internal'
import { createScripts } from './scripts'

interface Options {
  render: (instance: FC, props: any) => void
  vanish: (instance: FC) => void
}

const { define } = createConstructor<FC<any>, Options>((Instance, props, options) => {
  const { id, deferred, render, vanish: _vanish } = options

  const InstanceWithProvider = defineAnonymousComponent(() => {
    const content = (
      <ScriptsContext.Provider
        value={createScripts({ deferred, vanish })}
        {...{ id: pascalCase(id) }}
      >
        <Instance {...props} />
      </ScriptsContext.Provider>
    )
    return content
  })

  function vanish() {
    _vanish(InstanceWithProvider)
  }

  render(InstanceWithProvider, props)
}, { container: false })

export function useOverlayInject<Props, Resolved>(Instance: FC<Props>) {
  const { render, vanish } = useContext(InstancesContext)
  return define<Props, Resolved>(Instance, { render, vanish })
}
