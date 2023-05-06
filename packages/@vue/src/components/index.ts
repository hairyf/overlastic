/* eslint-disable vue/one-component-per-file */
import { isNumber, isString } from '@vueuse/core'
import type { Component, PropType, VNode } from 'vue-demi'
import { defineComponent, getCurrentInstance, h } from 'vue-demi'

import { context } from '../internal'

export const Provider = defineComponent({
  setup(_, { slots }) {
    const { appContext } = getCurrentInstance()!
    context.appContext = appContext
    return () => slots.default?.()
  },
}) as Component

export const Field = defineComponent({
  name: 'Field',
  props: {
    is: {
      type: [String, Number, Object] as PropType<string | number | VNode | Component>,
      default: '',
    },
  },
  setup(props) {
    return () => {
      if (isString(props.is) || isNumber(props.is))
        return props.is
      return props.is ? h(props.is) : null
    }
  },
})
