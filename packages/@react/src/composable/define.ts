import type { Dispatch, SetStateAction } from 'react'
import type { PropsWithOverlays } from '../types'
import { delay, noop } from '@overlastic/core'

import { useContext, useEffect } from 'react'
import { ScriptsContext } from '../internal'

export interface PromptifyEvents {
  /**
   * resolve event name used by the template
   */
  close?: string
  /**
   * reject event name used by the template
   *
   * @default 'onCancel'
   */
  cancel?: string
  /**
   * resolve event name used by the template
   *
   * @default 'onConfrim'
   */
  confrim?: string
}

export interface UseDisclosureOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
  /**
   * pass in the required props on jsx
   */
  props?: PropsWithOverlays

  /**
   *  fields used by jsx show
   *
   * @default 'visible'
   */
  model?: string

  /**
   * props use event name
   */
  events?: PromptifyEvents
  /**
   * whether to automatically handle components based on visible and duration
   *
   * @default true
   */
  automatic?: boolean
}

export interface UseDisclosureReturn {
  /** the notification reject(reason), modify visible, and destroy it after the duration ends */
  cancel: (reason?: any) => void
  /** the notification resolve(value), modify visible, and destroy it after the duration ends */
  confirm: (value?: any) => void
  /** the notification resolve(void), modify visible, and destroy it after the duration ends */
  close: () => void
  /** destroy the current instance (immediately) */
  vanish: () => void
  /** visible control popup display and hide */
  visible: boolean
  /** visible dispatch change */
  change: Dispatch<SetStateAction<boolean>>
  /** current deferred */
  deferred?: Promise<any>
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  const { immediate = true, duration = 0, automatic = true } = options
  const context = useContext(ScriptsContext)
  const isDeclarative = Reflect.get(context, '__is_declarative')
  const overlay = isDeclarative ? useDeclarative(options) : context

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  async function destroy() {
    overlay.change(false)
    await delay(duration)
    overlay.vanish?.()
    return Promise.resolve()
  }
  useMount(() => immediate && overlay.change(true))
  useMount(() => {
    if (!isDeclarative && automatic)
      overlay.deferred?.then(destroy).catch(destroy)
  })

  return overlay as UseDisclosureReturn
}

/**
 * @deprecated
 *
 * Use `useDisclosure` instead.
 */
export function useExtendOverlay(options: UseDisclosureOptions = {}) {
  const { confirm: resolve, cancel: reject, ...others } = useDisclosure(options)
  return { resolve, reject, others }
}

function useDeclarative(options: UseDisclosureOptions = {}) {
  const { props = {}, model = 'visible', events = {} } = options as any
  const { cancel = 'onCancel', confrim = 'onConfrim', close = 'onClose' } = events

  const _reject = (value?: any) => props[cancel]?.(value)
  const _resolve = (value?: any) => props[confrim]?.(value)
  const _close = (value?: any) => props[close]?.(value)

  return {
    cancel: _reject,
    confirm: _resolve,
    close: _close,
    visible: props[model],
    vanish: noop,
    change: noop,
    deferred: undefined,
  }
}

function useMount(callback: any = noop) {
  useEffect(() => callback(), [])
}
