import type { Component } from 'vue-demi'
import { markRaw } from 'vue'

import { defineComponent, Fragment, h, provide, ref } from 'vue-demi'
import { InstancesInjectionKey } from '../internal'

export interface Instance {
  Instance: Component
  props: any
}

export const OverlaysProvider = defineComponent({
  setup(_, { slots }) {
    const instances = ref<Instance[]>([])
    function render(Instance: Component, props: any) {
      instances.value.push({ Instance: markRaw(Instance), props })
    }

    function vanish(instance: Component) {
      instances.value = instances.value.filter(({ Instance }) => Instance !== instance)
    }

    provide(InstancesInjectionKey, { render, vanish })

    return () => h(Fragment, [
      ...instances.value.map((
        { Instance, props },
        index,
      ) => h(Instance, { ...props, key: index }),
      ),
      slots.default?.(),
    ])
  },
})
