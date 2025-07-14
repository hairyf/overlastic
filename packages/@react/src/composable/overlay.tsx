import type { ImperativeOverlay, MountOptions } from '@overlastic/core'
import type { FC } from 'react'
import { createConstructor, defineName } from '@overlastic/core'
import { pascalCase } from 'pascal-case'
import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { defineAnonymousComponent, InstancesContext, ScriptsContext } from '../internal'
import { createRefreshMetadata, createScripts } from './utils'

export interface InjectionOptions {
  render: (instance: FC, props: any) => void
  vanish: (instance: FC) => void
}

export type ExtractProps<P> = Omit<P, `on${string}` | 'visible'>

export type ExtractEvent<P extends Record<string, any>> = Parameters<Required<P>['onConfirm']>[0]

const { define: defineInject } = createConstructor<FC<any>, InjectionOptions>(
  (Instance, props, options) => {
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
  },
  { container: false },
)

function defineHolder(component: FC<any>, options: MountOptions = {}) {
  const { callback, scripts, props, refresh } = createRefreshMetadata()

  const name = defineName(options.id, options.autoIncrement)

  function render() {
    const root = options.root || (typeof document !== 'undefined' ? document.body : undefined)
    const Comp = component
    const content = (
      <div id={name}>
        {' '}
        <Comp {...props} />
        {' '}
      </div>
    )
    return (options.root !== false && root) ? createPortal(content, root) : content
  }

  const holder = (
    <ScriptsContext.Provider value={scripts} {...{ id: pascalCase(name) }}>
      {refresh ? render() : null}
    </ScriptsContext.Provider>
  )

  return [holder, callback as any]
}

export function useOverlay<Props extends Record<string, any>, Resolved = ExtractEvent<Props>>(Instance: FC<Props>, options?: MountOptions<{ type?: 'inject' }>): ImperativeOverlay<ExtractProps<Props>, Resolved>
export function useOverlay<Props extends Record<string, any>, Resolved = ExtractEvent<Props>>(Instance: FC<Props>, options?: MountOptions<{ type?: 'holder' }>): [JSX.Element, ImperativeOverlay<ExtractProps<Props>, Resolved>]
export function useOverlay(Instance: FC<any>, options: MountOptions<{ type?: 'holder' | 'inject' }> = {}): any {
  const { type = 'inject' } = options ?? {}
  if (type === 'inject') {
    const { render, vanish } = useContext(InstancesContext)
    return defineInject(Instance, { render, vanish })
  }
  if (type === 'holder') {
    return defineHolder(Instance, options)
  }
}
