import { it } from 'vitest'
import { defineComponent } from 'vue'
import { renderVNode } from '../src/helper/render'

it('render basic', () => {
  renderVNode(defineComponent({}), {})
})
