import { delay } from '@overlastic/core'
import Vue from 'vue'
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

export interface OverlayDefineOptions {
  /** duration duration to avoid premature destruction of components */
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

export function useDefineOverlay(options: OverlayDefineOptions = {}) {
  const { duration = 0, immediate = true, model = 'visible', automatic = true, events = {} } = options
  events.reject = events.reject || 'reject'
  events.resolve = events.resolve || 'resolve'

  const mixinOptions = Vue.extend({
    inject: [ScriptsInjectionKey],
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
            delay(duration).then((this.$overlay as any).vanish)
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
      async $runtime_effect(type: 'reject' | 'resolve', value: any) {
        this.$emit(events[type]!, value)
        this.$visible = false
      },
      async $resolve(value: any) {
        (this.$overlay as any)?.resolve(value)
      },
      async $reject(value: any) {
        (this.$overlay as any)?.reject(value)
      },
    },
  })

  return mixinOptions
}
