import type { Ref } from 'vue-demi'
import { getCurrentInstance, inject, onMounted, provide } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import type { Deferred } from '@overlastic/core'
import { delay, noop } from '@overlastic/core'
import { ScriptsInjectionKey } from '../internal'

export interface PromptifyEvents {
  /**
   * reject event name used by the template
   *
   * @default 'reject'
   */
  reject?: string
  /**
   * resolve event name used by the template
   *
   * @default 'resolve'
   */
  resolve?: string
}

export interface ExtendOverlayOptions {
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

export interface ExtendOverlayReturn {
  /** the notification reject, modify visible, and destroy it after the duration ends */
  reject: (reason?: any) => void
  /** the notification resolve, modify visible, and destroy it after the duration ends */
  resolve: (value?: any) => void
  /** destroy the current instance (immediately) */
  vanish: () => void
  /** visible control popup display and hide */
  visible: Ref<boolean>
  /** current deferred */
  deferred?: Deferred<any>
}

/**
 * get overlay layer meta information
 * @function reject  the notification reject, modify visible, and destroy it after the duration ends
 * @function resolve the notification resolve, modify visible, and destroy it after the duration ends
 * @function vanish destroy the current instance (immediately)
 * @field visible control overlay display and hide
 */
export function useExtendOverlay(options: ExtendOverlayOptions = {}) {
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

export function useDeclarative(model: string, options: ExtendOverlayOptions = {}) {
  const { reject = 'reject', resolve = 'resolve' } = options.events || {}

  const instance = getCurrentInstance()

  if (!instance)
    throw new Error('Please use useExtendOverlay in component setup')

  const visible = useVModel(instance.props, model, instance.emit, { passive: true }) as Ref<boolean>

  const _reject = (value?: any) => {
    instance?.emit(reject, value)
    visible.value = false
  }
  const _resolve = (value?: any) => {
    instance?.emit(resolve, value)
    visible.value = false
  }

  return {
    reject: _reject,
    resolve: _resolve,
    vanish: noop,
    visible,
    in_dec: true,
  }
}
