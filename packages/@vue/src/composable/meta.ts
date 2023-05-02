import type { Ref } from 'vue-demi'
import { getCurrentInstance, inject, onMounted, provide } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import type { Promiser } from '@overlays/core'
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
  /** current promiser */
  promiser?: Promiser<any>
}

/**
 * get overlay layer meta information
 * @function reject  the notification reject, modify visible, and destroy it after the duration ends
 * @function resolve the notification resolve, modify visible, and destroy it after the duration ends
 * @function vanish destroy the current instance (immediately)
 * @field visible control overlay display and hide
 * @returns
 */
export function useOverlay(options: OverlayOptions = {}) {
  const { duration = 0, immediate = true, model = 'visible', automatic = true } = options
  const meta = inject(OverlayMetaKey, useDeclarative(model, options))
  const dec = Reflect.get(meta, 'in_dec')

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  if (!dec && automatic) {
    meta.promiser?.finally(async () => {
      meta.visible.value = false
      await delay(duration)
      meta.vanish?.()
    })
  }

  if (!dec && immediate)
    onMounted(() => meta.visible.value = true)

  provide(OverlayMetaKey, null)

  return meta
}

export function useDeclarative(model: string, options: OverlayOptions = {}) {
  const { reject = 'reject', resolve = 'resolve' } = options.events || {}

  const instance = getCurrentInstance()

  if (!instance)
    throw new Error('Please use useOverlay in component setup')

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
