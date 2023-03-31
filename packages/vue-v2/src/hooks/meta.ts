import { delay } from '@unoverlays/utils'
import Vue from 'vue'
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

export function useOverlayMeta(options: OverlayOptions = {}) {
  const { animation = 0, immediate = true, model = 'visible', automatic = true, event = {} } = options
  event.cancel = event.cancel || 'cancel'
  event.confirm = event.confirm || 'confirm'

  const mixinOptions = Vue.extend({
    inject: [OverlayMetaKey],
    model: {
      prop: model,
      event: 'change',
    },
    props: { [model]: Boolean },
    data() {
      if (this.$overlay)
        return { runtime_visible: false }
      return {}
    },
    computed: {
      $visible: {
        set(value: any) {
          this.$overlay ? (this.runtime_visible = value) : this.$emit('change', value)
          if (value === false && automatic)
            delay(animation).then((this.$overlay as any).vanish)
        },
        get() {
          return this.$overlay ? this.runtime_visible : this[model]
        },
      },
    },
    created() {
      if (immediate)
        this.$visible = true
      if (this.$overlay)
        (this.$overlay as any).on('*', this.$runtime_effect)
    },
    methods: {
      async $runtime_effect(type: 'cancel' | 'confirm', value: any) {
        this.$emit(event[type]!, value)
        this.$visible = false
      },
      async $confirm(value: any) {
        (this.$overlay as any)?.confirm(value)
      },
      async $cancel(value: any) {
        (this.$overlay as any)?.cancel(value)
      },
    },
  })

  return mixinOptions
}
