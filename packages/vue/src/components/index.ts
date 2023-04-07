/* eslint-disable vue/one-component-per-file */
import { isNumber, isString } from '@vueuse/core'
import type { Component, PropType, VNode } from 'vue-demi'
import { defineComponent, getCurrentInstance, h } from 'vue-demi'

import { context } from '../helper'

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
      type: [String, Number, Object] as PropType<string | number | VNode | Component>,
      default: '',
    },
  },
  setup(props) {
    return () => {
      if (isString(props.value) || isNumber(props.value))
        return props.value
      return props.value ? h(props.value) : null
    }
  },
})
