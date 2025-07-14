import { delay } from '@overlastic/core'
import Vue from 'vue'
import { ScriptsInjectionKey } from '../internal'

export interface PromptifyEvents {
  /**
   * confrim event name used by the template
   *
   * @default 'confrim'
   */
  cancel?: string
  /**
   * cancel event name used by the template
   *
   * @default 'cancel'
   */
  confrim?: string
}

export interface ExtendOverlayOptions {
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

export function useDisclosure(options: ExtendOverlayOptions = {}) {
  const { duration = 0, immediate = true, model = 'visible', automatic = true, events = {} } = options
  events.confrim = events.confrim || 'confrim'
  events.cancel = events.cancel || 'cancel'

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
      async $runtime_effect(type: 'confrim' | 'cancel', value: any) {
        this.$emit(events[type]!, value)
        this.$visible = false
      },
      async $cancel(value: any) {
        (this.$overlay as any)?.cancel(value)
      },
      async $confrim(value: any) {
        (this.$overlay as any)?.confrim(value)
      },
    },
  })

  return mixinOptions
}
