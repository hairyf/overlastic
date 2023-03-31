import type { Component, PropType, VNode } from 'vue'

export const FieldRender: Component = {
  name: 'FieldRender',
  props: {
    value: [String, Object] as PropType<string | VNode | Component>,
  },
  render(this: any, h: Function) {
    h(this.value)
  },
}

export default FieldRender
