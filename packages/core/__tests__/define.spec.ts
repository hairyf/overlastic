import { defineGlobalNode, defineName } from '../src'

describe('@overlays/core:define', () => {
  it('global', () => {
    const globalElement = defineGlobalNode('global-element')

    expect(globalElement.id).toBe('global-element')
    expect(globalElement.parentElement === document.body).toBeTruthy()
    globalElement.remove()
    const childElement = defineGlobalNode('child-element', globalElement)
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
  })
})
