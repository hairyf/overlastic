import { delay } from '@unoverlays/utils'
import type { ComponentOptions } from 'vue/types'
import type Vue from 'vue'
import { OverlayMetaKey } from '../internal'
import { DefaultData } from 'vue/types/options'

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
  const { animation = 0, immediate = true, model = 'visible', automatic = true, event = {} } = options
  event.cancel = event.cancel || 'cancel'
  event.confirm = event.confirm || 'confirm'
  const mixinOptions: ComponentOptions<Vue> = {
    inject: [OverlayMetaKey],
    props: { [model]: Boolean },
    model: {
      prop: model,
      event: 'change',
    },
    data(this: any) {
      if (this.$overlay)
        return { runtime_visible: false }
      return {}
    },
    methods: {
      async $runtime_effect(this: any, type: 'cancel' | 'confirm', value: any) {
        this.$emit(event[type], value)
        this.$visible = false
      },
      async $confirm(this: any, value: any) {
        this.$overlay?.confirm(value)
      },
      async $cancel(this: any, value: any) {
        this.$overlay?.cancel(value)
      },
    },
    created(this: any) {
      if (immediate)
        this.$visible = true
      if (this.$overlay)
        this.$overlay.on('*', this.$runtime_effect)
    },
    computed: {
      $visible: {
        set(this: any, value: any) {
          this.$overlay ? (this.runtime_visible = value) : this.$emit('change', value)
          if (value === false && automatic)
            delay(animation).then(this.$overlay.vanish)
        },
        get(this: any) {
          return this.$overlay ? this.runtime_visible : this[model]
        },
      },
    },
  }

  return mixinOptions
}
