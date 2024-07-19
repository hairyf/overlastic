import { createConstructor } from '@overlastic/core'
import { type FC, useContext } from 'react'
import { pascalCase } from 'pascal-case'
import { InstancesContext, ScriptsContext, defineAnonymousComponent } from '../internal'
import { useScripts } from './scripts'

interface Options {
  render: (instance: FC, props: any) => void
  vanish: (instance: FC) => void
}

const { define } = createConstructor<FC<any>, Options>((Instance, props, options) => {
  const { id, deferred, render, vanish: _vanish } = options

  const InstanceWithProvider = defineAnonymousComponent(() => {
    const content = (
      <ScriptsContext.Provider
        value={useScripts({ deferred, vanish })}
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

export function useOverlay<Props, Resolved>(Instance: FC<Props>) {
  const { render, vanish } = useContext(InstancesContext)
  return define<Props, Resolved>(Instance, { render, vanish })
}
