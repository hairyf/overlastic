import { createConstructor } from '@overlastic/core'
import { type FC, useContext } from 'react'
import { pascalCase } from 'pascal-case'
import { createPortal } from 'react-dom'
import { InstancesContext, ScriptsContext, defineAnonymousComponent } from '../internal'
import { useScripts } from './useScripts'

interface Options {
  render: (instance: FC, props: any) => void
  vanish: (instance: FC) => void
}

const { define } = createConstructor<FC<any>, Options>((Instance, props, options) => {
  const { container, id, deferred, render, vanish: _vanish } = options

  const InstanceWithProvider = defineAnonymousComponent(() => {
    const content = (
      <ScriptsContext.Provider
        value={useScripts({ deferred, vanish })}
        {...{ id: pascalCase(id) }}
      >
        <Instance {...props} />
      </ScriptsContext.Provider>
    )
    return createPortal(content, container)
  })

  function vanish() {
    _vanish(InstanceWithProvider)
    container.remove()
  }

  render(InstanceWithProvider, props)
})

export function useOverlay<Props, Resolved>(Instance: FC<Props>) {
  const { render, vanish } = useContext(InstancesContext)
  return define<Props, Resolved>(Instance, { render, vanish })
}
