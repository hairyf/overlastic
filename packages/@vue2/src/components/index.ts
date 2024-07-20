import type { Component, PropType, VNode } from 'vue'

export const Field: Component = {
  name: 'Field',
  props: {
    value: [String, Object] as PropType<string | VNode | Component>,
  },
  render(this: any, h) {
    return h(this.value)
  },
}

export default Field
