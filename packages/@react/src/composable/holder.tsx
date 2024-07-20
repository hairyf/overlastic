import { createDeferred, defineName } from '@overlastic/core'
import { pascalCase } from 'pascal-case'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Deferred, ImperativeOverlay, MountOptions } from '@overlastic/core'
import { ScriptsContext } from '../internal'

export type InjectionHolder<Props, Resolved> = [JSX.Element, ImperativeOverlay<Props, Resolved>]

export function useOverlayHolder<Props, Resolved = void>(
  component: FC<Props>,
  options: MountOptions = {},
): InjectionHolder<Props, Resolved> {
  const { callback, scripts, props, refresh } = useRefreshMetadata()

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
    return (options.root !== false && root)
      ? createPortal(content, root)
      : content
  }

  const holder = (
    <ScriptsContext.Provider
      value={scripts}
      {...{ id: pascalCase(name) }}
    >
      {refresh ? render() : null}
    </ScriptsContext.Provider>
  )

  return [holder, callback as any]
}

function useRefreshMetadata() {
  const [props, setProps] = useState<any>()
  const [refresh, setRefresh] = useState(false)
  const [visible, setVisible] = useState(false)

  const deferred = useRef<Deferred>({} as any)

  const scripts = {
    deferred: deferred.current,
    resolve: deferred.current.resolve,
    reject: deferred.current.reject,
    vanish,
    visible,
    setVisible,
  }

  function vanish() {
    setRefresh(false)
    setProps({})
    scripts.reject?.()
  }

  async function callback(props: any) {
    deferred.current = createDeferred()

    setProps(props)
    setRefresh(true)

    return deferred.current
  }

  return { callback, scripts, props, refresh }
}
