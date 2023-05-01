import { useOverlayMeta } from '../src'

describe('@unoverlays/utils:composable', () => {
  it('use hooks in not setup', () => {
    expect(() => useOverlayMeta()).toThrowError()
  })
})
