import { createImperativePromiser, varName } from '@unoverlays/utils'
import { pascalCase } from 'pascal-case'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { OverlayContext } from '../helper'

import type { ImperativeOverlay } from '../define'
import type { MountOptions } from '../types'
import type { VisiblePromiseOptions } from './visible'
import { useVisibleScripts } from './visible'

export type InjectionHolder<Props, Resolved> = [ImperativeOverlay<Props, Resolved>, JSX.Element]

export function useInjectHolder<Props, Resolved = void>(
  Component: FC,
  options: MountOptions = {},
): InjectionHolder<Props, Resolved> {
  const { callback, scripts, props, refresh } = useRefreshMetadata()

  const name = varName(options.id, options.autoIncrement)
  const root = options.root || document.body
  const isTeleport = options.root !== false

  function render() {
    const content = <div id={name}> <Component {...props} /> </div>
    return isTeleport ? createPortal(content, root) : content
  }

  const holder = (
    <OverlayContext.Provider
      value={scripts}
      children={refresh ? render() : null}
      {...{ id: pascalCase(name) }}
    />
  )

  return [callback as any, holder]
}

export function useRefreshMetadata() {
  const [props, setProps] = useState<any>()
  const [refresh, setRefresh] = useState(false)
  const { current: options } = useRef<VisiblePromiseOptions>({
    vanish,
  })
  const scripts = useVisibleScripts(options)

  function vanish() {
    setRefresh(false)
    setProps({})
  }

  async function callback(props: any) {
    const promiser = createImperativePromiser()
    Object.assign(options, { promiser })
    setProps(props)
    setRefresh(true)

    return promiser.promise
  }

  return { callback, scripts, props, refresh }
}
