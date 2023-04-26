import { renderReactDOM } from '@unoverlays/react/src/helper/render'
import { delay } from '@unoverlays/utils'
import { isBasicExists } from '../utils'
import Basic from './component/basic'
describe('@unoverlays/react:render', () => {
  it('render:vnode', async () => {
    const { vanish } = renderReactDOM(Basic, {})

    await delay(20)

    expect(isBasicExists()).toBeTruthy()

    vanish()

    await delay(20)

    expect(isBasicExists()).toBeFalsy()
  })
})
