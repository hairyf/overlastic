import { delay } from '@unoverlays/utils'
import type { Component } from 'vue'
import { OverlayMetaKey } from '../internal'

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
  }
  /**
   * whether to automatically handle components based on visible and animation
   *
   * @default true
   */
  automatic?: boolean
}

export function mixinOverlayMeta(options: OverlayOptions = {}) {
  const { animation = 0, immediate = true, model = 'visible', automatic = true } = options

  const mixinOptions: Component = {
    inject: { OverlayMetaKey },

    model: {
      prop: model,
      event: 'change',
    },
    mounted() {
      if (immediate)
        (this as any).$visible = true
    },
    watch: {
      async visible() {
        if (this.$visible || !automatic)
          return
        if (animation > 0)
          await delay(animation)

        ;(this as any).$vanish?.()
      },
    },
  }

  return mixinOptions
}
