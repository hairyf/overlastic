import { allowed, createDeferred, defineGlobalElement, defineName } from '../src'

describe('@overlastic/core:define', () => {
  it('global', () => {
    const globalElement = defineGlobalElement('global-element')
    expect(globalElement.id).toBe('global-element')
    expect(globalElement.parentElement === document.body).toBeTruthy()
    globalElement.remove()
    const childElement = defineGlobalElement('child-element', globalElement)
    expect(childElement.parentElement === globalElement).toBeTruthy()
    childElement.remove()
  })
  it('defineName', () => {
    expect(defineName('a-name')).toBe('a-name--1')
    expect(defineName('a-name')).toBe('a-name--2')
    expect(defineName('a-name')).toBe('a-name--3')
    expect(defineName('b-name')).toBe('b-name--1')
    expect(defineName('b-name')).toBe('b-name--2')
    expect(defineName('b-name')).toBe('b-name--3')
    expect(defineName('b-name', false)).toBe('b-name')
    expect(defineName('a-name', false)).toBe('a-name')
  })
  it('allowed', () => {
    expect(() => allowed()).toThrowError()
  })
  it('promise:resolve', () => {
    const deferred = createDeferred<string>()

    deferred.resolve('resolve')
    expect(deferred).resolves.toBe('resolve')
  })
  it('promise:reject', () => {
    const deferred = createDeferred<string>()

    deferred.reject('reject')
    expect(deferred).rejects.toBe('reject')
  })
})
