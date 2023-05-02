import { useOverlay } from '../src'

describe('@overlays/utils:composable', () => {
  it('use hooks in not setup', () => {
    expect(() => useOverlay()).toThrowError()
  })
})
