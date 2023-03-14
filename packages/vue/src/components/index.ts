/* eslint-disable vue/one-component-per-file */
import type { Component, PropType, VNode } from 'vue-demi'
import { defineComponent, getCurrentInstance, h } from 'vue-demi'

import { context } from '../internal'

export const UnifiedOverlayProvider = defineComponent({
  setup(_, { slots }) {
    const { appContext } = getCurrentInstance()!
    context.appContext = appContext
    return () => slots.default?.()
  },
}) as Component

export const FieldRender = defineComponent({
  name: 'FieldRender',
  props: {
    value: {
      type: [String, Object] as PropType<string | VNode | Component>,
      default: '',
    },
  },
  setup(props) {
    return () => {
      if (isString(props.value))
        return props.value
      return h(props.value)
    }
  },
})

function isString(value: any): value is string {
  return typeof value === 'string'
}
