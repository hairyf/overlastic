import type { Ref } from 'vue-demi'
import { getCurrentInstance, inject, onMounted, provide, watch } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { delay, noop } from '@unoverlays/utils'
import { OverlayMetaKey } from '../helper'

export interface OverlayOptions {
  /** animation duration to avoid premature destruction of components */
  animation?: number
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
  event?: {
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
  /**
   * whether to automatically handle components based on visible and animation
   *
   * @default true
   */
  automatic?: boolean
}

export interface OverlayMeta {
  /** the notification reject, modify visible, and destroy it after the animation ends */
  reject: Function
  /** the notification resolve, modify visible, and destroy it after the animation ends */
  resolve: Function
  /** destroy the current instance (immediately) */
  vanish: Function
  /** visible control popup display and hide */
  visible: Ref<boolean>
  /** use in template */
  inTemplate?: boolean
}

/**
 * get overlay layer meta information
 * @function reject  the notification reject, modify visible, and destroy it after the animation ends
 * @function resolve the notification resolve, modify visible, and destroy it after the animation ends
 * @function vanish destroy the current instance (immediately)
 * @field visible control popup display and hide
 * @returns
 */
export function useOverlayMeta(options: OverlayOptions = {}) {
  const { animation = 0, immediate = true, model = 'visible', automatic = true } = options
  const meta = inject(OverlayMetaKey, useTemplateMeta(model, options))

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  if (!meta.inTemplate && automatic) {
    watch(meta.visible, async () => {
      if (meta.visible.value)
        return
      if (animation > 0)
        await delay(animation)
      meta.vanish?.()
    })
  }

  if (!meta.inTemplate && immediate)
    onMounted(() => meta.visible.value = true)

  provide(OverlayMetaKey, null)
  return meta
}

export function useTemplateMeta(model: string, options: OverlayOptions = {}) {
  const instance = getCurrentInstance()
  const events = options.event || {}

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
    inTemplate: true,
  }
}
