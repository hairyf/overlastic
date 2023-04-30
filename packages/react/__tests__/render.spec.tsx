import { renderReactDOM } from '@unoverlays/react/src/helper/render'
import { delay } from '@unoverlays/utils'
import { isBasicExists } from '@unoverlays/utils/__tests__'
import { describe, expect, it } from 'vitest'
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
