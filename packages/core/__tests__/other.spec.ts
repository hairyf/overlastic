import { allowed, createPromiser, defineGlobalNode, varName } from '../src'

describe('@unoverlays/utils:define', () => {
  it('global', () => {
    const globalElement = defineGlobalNode('global-element')
    expect(globalElement.id).toBe('global-element')
    expect(globalElement.parentElement === document.body).toBeTruthy()
    globalElement.remove()
    const childElement = defineGlobalNode('child-element', globalElement)
    expect(childElement.parentElement === globalElement).toBeTruthy()
    childElement.remove()
  })
  it('varName', () => {
    expect(varName('a-name')).toBe('a-name--1')
    expect(varName('a-name')).toBe('a-name--2')
    expect(varName('a-name')).toBe('a-name--3')
    expect(varName('b-name')).toBe('b-name--1')
    expect(varName('b-name')).toBe('b-name--2')
    expect(varName('b-name')).toBe('b-name--3')
    expect(varName('b-name', false)).toBe('b-name')
    expect(varName('a-name', false)).toBe('a-name')
  })
  it('allowed', () => {
    expect(() => allowed()).toThrowError()
  })
  it('promise:resolve', () => {
    const { promise, resolve } = createPromiser<unknown, string>()

    resolve('resolve')
    expect(promise).resolves.toBe('resolve')
  })
  it('promise:reject', () => {
    const { promise, reject } = createPromiser<unknown, string>()

    reject('reject')
    expect(promise).rejects.toBe('reject')
  })
})
