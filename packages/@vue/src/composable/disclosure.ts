import type { Deferred } from '@overlastic/core'
import type { Ref } from 'vue-demi'
import { delay, noop } from '@overlastic/core'
import { useVModel } from '@vueuse/core'
import { getCurrentInstance, inject, onMounted, provide } from 'vue-demi'
import { ScriptsInjectionKey } from '../internal'

export interface PromptifyEvents {
  /**
   * cancel event name used by the template
   *
   * @default 'cancel'
   */
  cancel?: string
  /**
   * confirm event name used by the template
   *
   * @default 'confirm'
   */
  confirm?: string
  /**
   * confirm event name used by the template
   *
   * @default 'close'
   */
  close?: string
}

export interface UseDisclosureOptions {
  /** animation duration to avoid premature destruction of components */
  duration?: number
  /** whether to set visible to true immediately */
  immediate?: boolean
  /**
   * v-model fields used by template
   *
   * @default 'visible'
   */
  model?: string

  /**
   * template use event name
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
  /** the notification cancel, modify visible, and destroy it after the duration ends */
  cancel: (reason?: any) => void
  /** the notification confirm, modify visible, and destroy it after the duration ends */
  confirm: (value?: any) => void
  /** the notification confirm, modify visible, and destroy it after the duration ends */
  close: () => void
  /** destroy the current instance (immediately) */
  vanish: () => void
  /** visible control popup display and hide */
  visible: Ref<boolean>
  /** current deferred */
  deferred?: Deferred<any>
}

/**
 * get overlay layer meta information
 * @function cancel  the notification cancel, modify visible, and destroy it after the duration ends
 * @function confirm the notification confirm, modify visible, and destroy it after the duration ends
 * @function vanish destroy the current instance (immediately)
 * @field visible control overlay display and hide
 */
export function useDisclosure(options: UseDisclosureOptions = {}) {
  const { duration = 0, immediate = true, model = 'visible', automatic = true } = options
  const overlay = inject(ScriptsInjectionKey, useDeclarative(model, options))
  const dec = Reflect.get(overlay, 'in_dec')
  const { visible, deferred, vanish } = overlay

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  async function destroy() {
    visible.value = false
    await delay(duration)
    vanish?.()
    return Promise.resolve()
  }
  if (!dec && automatic)
    deferred?.then(destroy).catch(destroy)
  if (!dec && immediate)
    onMounted(() => visible.value = true)

  provide(ScriptsInjectionKey, null as any)
  return overlay
}

function useDeclarative(model: string, options: UseDisclosureOptions = {}) {
  const { cancel = 'cancel', confirm = 'confirm', close = 'close' } = options.events || {}

  const instance = getCurrentInstance()

  if (!instance)
    throw new Error('Please use useDisclosure in component setup')

  const visible = useVModel(instance.props, model, instance.emit, { passive: true }) as Ref<boolean>

  const _cancel = (value?: any) => {
    instance?.emit(cancel, value)
    visible.value = false
  }
  const _confirm = (value?: any) => {
    instance?.emit(confirm, value)
    visible.value = false
  }
  const _close = (value?: any) => {
    instance?.emit(close, value)
    visible.value = false
  }

  return {
    cancel: _cancel,
    confirm: _confirm,
    close: _close,
    vanish: noop,
    visible,
    in_dec: true,
  }
}
