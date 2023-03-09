import type { Ref } from 'vue-demi'
import { getCurrentInstance, inject, onMounted, provide, ref, watch } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { OverlayMetaKey } from '../internal'
import { delay, noop } from '../utils'

export interface UseOverlayMetaOptions {
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
   * whether to automatically handle components based on visible and animation
   *
   * @default true
   */
  automatic?: boolean
}

/**
 * get overlay layer meta information
 * @function cancel  the notification cancel, modify visible, and destroy it after the animation ends
 * @function confirm the notification confirm, modify visible, and destroy it after the animation ends
 * @function vanish destroy the current instance (immediately)
 * @field vnode the VNode of the current injection layer
 * @field visible control popup display and hide
 * @returns
 */
export function useOverlayMeta(options: UseOverlayMetaOptions = {}) {
  const { animation = 0, immediate = true, model = 'visible', automatic = true } = options
  const defaultMeta = getTemplateMeta(model, options)
  const meta = inject(OverlayMetaKey, defaultMeta) || defaultMeta

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  if (!meta.isTemplate && automatic) {
    watch(meta.visible, async () => {
      if (meta.visible.value)
        return undefined
      if (animation > 0)
        await delay(animation)
      meta.vanish?.()
    })
  }

  if (immediate)
    onMounted(() => (meta.visible.value = true))

  provide(OverlayMetaKey, null)
  return meta
}

export function getTemplateMeta(model: string, options: UseOverlayMetaOptions = {}) {
  const instance = getCurrentInstance()

  const visible = instance ? useVModel(instance.props, model) as Ref<boolean> : ref(false)

  const cancel = (value?: any) => {
    visible.value = false
    instance?.emit(options.cancel || 'cancel', value)
  }
  const confirm = (value?: any) => {
    visible.value = false
    instance?.emit(options.confirm || 'confirm', value)
  }
  return {
    cancel,
    confirm,
    vanish: noop,
    visible,
    isTemplate: true,
  }
}
