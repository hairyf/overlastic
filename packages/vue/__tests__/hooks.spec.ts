import { useOverlayMeta } from '@unoverlays/vue'

describe('@unoverlays/utils:hooks', () => {
  it('use hooks in not setup', () => {
    expect(() => useOverlayMeta()).toThrowError()
  })
})
