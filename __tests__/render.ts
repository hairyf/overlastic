import { it } from 'vitest'
import { defineComponent } from 'vue-demi'
import { renderChildApp } from '../src/helper/render'

it('render basic', () => {
  renderChildApp(defineComponent({}), {})
})
