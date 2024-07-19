import { useOverlayDefine } from '../src'

describe('@overlastic/utils:composable', () => {
  it('use hooks in not setup', () => {
    expect(() => useOverlayDefine()).toThrowError()
  })
})
