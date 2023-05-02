import type { Ref } from 'vue-demi'
import { getCurrentInstance, inject, onMounted, provide, watch } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { delay, noop } from '@overlays/core'
import { OverlayMetaKey } from '../internal'

export interface OverlayEvents {
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

export interface OverlayOptions {
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
  events?: OverlayEvents
  /**
   * whether to automatically handle components based on visible and duration
   *
   * @default true
   */
  automatic?: boolean
}

export interface OverlayMeta {
  /** the notification reject, modify visible, and destroy it after the duration ends */
  reject: Function
  /** the notification resolve, modify visible, and destroy it after the duration ends */
  resolve: Function
  /** destroy the current instance (immediately) */
  vanish: Function
  /** visible control popup display and hide */
  visible: Ref<boolean>
  promise?: Promise<any>
}

/**
 * get overlay layer meta information
 * @function reject  the notification reject, modify visible, and destroy it after the duration ends
 * @function resolve the notification resolve, modify visible, and destroy it after the duration ends
 * @function vanish destroy the current instance (immediately)
 * @field visible control popup display and hide
 * @returns
 */
export function useOverlayMeta(options: OverlayOptions = {}) {
  const { duration = 0, immediate = true, model = 'visible', automatic = true } = options
  const meta = inject(OverlayMetaKey, useDeclarativeMeta(model, options))
  const dec = Reflect.get(meta, '__in_dec')

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  if (!dec && automatic) {
    watch(meta.visible, async () => {
      if (meta.visible.value)
        return
      if (duration > 0)
        await delay(duration)
      meta.vanish?.()
    })
  }

  if (!dec && immediate)
    onMounted(() => meta.visible.value = true)

  provide(OverlayMetaKey, null)
  return meta
}

export function useDeclarativeMeta(model: string, options: OverlayOptions = {}) {
  const instance = getCurrentInstance()
  const events = options.events || {}

  if (!instance)
    throw new Error('Please use useOverlayMeta in component setup')

  const visible = useVModel(instance.props, model, instance.emit, { passive: true }) as Ref<boolean>

  const reject = (value?: any) => {
    visible.value = false
    instance?.emit(events.reject || 'reject', value)
  }
  const resolve = (value?: any) => {
    visible.value = false
    instance?.emit(events.resolve || 'resolve', value)
  }
  return {
    reject,
    resolve,
    vanish: noop,
    visible,
    __in_dec: true,
  }
}
