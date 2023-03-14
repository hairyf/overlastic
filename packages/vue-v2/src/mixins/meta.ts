import { delay } from '@unoverlays/utils'
import type { ComponentOptions } from 'vue/types'
import type Vue from 'vue'
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

  const mixinOptions: ComponentOptions<Vue> = {
    inject: [OverlayMetaKey],
    props: { [model]: Boolean },
    model: {
      prop: model,
      event: 'change',
    },
    data(this: any) {
      if (this.$overlay)
        return { $runtime_visible: false }
      return {}
    },
    methods: {
      async $confirm(this: any, value: any) {
        const result = this.$overlay.confirm(value)
        this.$visible = false
        return result
      },
      async $cancel(this: any, value: any) {
        const result = this.$overlay.cancel(value)
        this.$visible = false
        return result
      },
    },
    mounted(this: any) {
      if (immediate)
        this.$visible = true
    },
    computed: {
      $isTemplate() {
        return !this.$overlay
      },
      $visible: {
        set(this: any, value: any) {
          if (this.$isTemplate)
            this.$emit('change', value)
          else
            this.$runtime_visible = value
          if (value === false && automatic)
            delay(animation).then(this.$overlay.vanish)
        },
        get(this: any) {
          if (this.$isTemplate)
            return this[model]
          else
            return this.$runtime_visible
        },
      },
    },
  }

  return mixinOptions
}
