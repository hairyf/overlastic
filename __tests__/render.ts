import { it } from 'vitest'
import { defineComponent } from 'vue'
import { renderInstance } from '../src/helper/render'

it('render basic', () => {
  renderInstance(defineComponent({}), {})
})
