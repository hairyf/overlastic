import { createDeferred, defineName } from '@overlays/core'
import { pascalCase } from 'pascal-case'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Deferred, ImperativeOverlay, MountOptions } from '@overlays/core'
import { Context } from '../internal'

export type InjectionHolder<Props, Resolved> = [JSX.Element, ImperativeOverlay<Props, Resolved>]

export function useInjectHolder<Props, Resolved = void>(
  Component: FC<Props>,
  options: MountOptions = {},
): InjectionHolder<Props, Resolved> {
  const { callback, scripts, props, refresh } = useRefreshMetadata()

  const name = defineName(options.id, options.autoIncrement)

  function render() {
    const root = options.root || (typeof document !== 'undefined' ? document.body : undefined)
    const content = <div id={name}> <Component {...props} /> </div>
    return (options.root !== false && root)
      ? createPortal(content, root)
      : content
  }

  const holder = (
    <Context.Provider
      value={scripts}
      children={refresh ? render() : null}
      {...{ id: pascalCase(name) }}
    />
  )

  return [holder, callback as any]
}

export function useRefreshMetadata() {
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
