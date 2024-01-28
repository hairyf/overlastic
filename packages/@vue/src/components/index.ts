/* eslint-disable vue/one-component-per-file */
import type { Component, PropType, VNode } from 'vue-demi'
import { Fragment, defineComponent, getCurrentInstance, h, provide, ref } from 'vue-demi'

import { InstancesInjectionKey, context } from '../internal'

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
      if (typeof props.is === 'string' || typeof props.is === 'number')
        return props.is
      return props.is ? h(props.is) : null
    }
  },
})

export interface Instance {
  Instance: Component
  props: any
}

export const OverlaysProvider = defineComponent({
  setup(_, { slots }) {
    const instances = ref<Instance[]>([])
    function render(Instance: Component, props: any) {
      instances.value.push({ Instance, props })
    }

    function vanish(instance: Component) {
      instances.value = instances.value.filter(({ Instance }) => Instance === instance)
    }

    provide(InstancesInjectionKey, { render, vanish })

    return () => h(Fragment, [
      ...instances.value.map(({ Instance, props }, index) => h(Instance, { ...props, key: index })),
      slots.default?.(),
    ])
  },
})
