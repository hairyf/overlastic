import { delay } from '@overlastic/core'
import { describe, expect, it } from 'vitest'
import { defineOverlay, renderOverlay } from '../src'
import { clear, isModalExists, queryModalTitle, reject, resolve } from '../../__tests__'
import Overlay from './component/overlay'

describe('@overlastic/react:imperative', () => {
  async function toModalExists(bool: boolean) {
    await delay(20)
    const ex = expect(isModalExists())
    bool ? ex.toBeTruthy() : ex.toBeFalsy()
  }

  it('mount', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    callback()
    await toModalExists(true)
    clear()
  })

  it('mount:multiple', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    callback()
    callback()
    callback()
    callback()

    await delay(20)

    const elements = document.querySelectorAll('.base-modal__mask')
    expect(elements.length).toBe(4)

    clear()
  })

  it('mount:only', async () => {
    const callback = defineOverlay<unknown, string>(Overlay, { only: true })

    callback()
    callback()
    callback()
    callback()

    await delay(20)

    const elements = document.querySelectorAll('.base-modal__mask')
    expect(elements.length).toBe(1)

    clear()
  })

  it('mount:render', async () => {
    renderOverlay(Overlay)
    await toModalExists(true)
    clear()
  })

  it('emit:resolve', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    expect(callback()).resolves.toBe('resolve')

    await toModalExists(true)

    resolve()

    await toModalExists(false)
  })

  it('emit:reject', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    callback()

    await toModalExists(true)

    reject()

    await toModalExists(false)
  })

  it('manual:resolve', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    const instance = callback()

    expect(instance).resolves.toBe('manual-confirm')

    await toModalExists(true)

    instance.resolve('manual-confirm')

    await toModalExists(false)
  })

  it('manual:reject', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    const instance = callback()

    await toModalExists(true)

    expect(instance).rejects.toBe('manual-cancel')

    instance.reject('manual-cancel')

    await toModalExists(false)
  })

  it('manual:not-allowed', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    const instance = callback()

    await toModalExists(true)

    await instance.resolve('manual:not-allowed')

    await toModalExists(false)
  })

  it('transmit:props', async () => {
    const callback = defineOverlay<{ title?: string }, string>(Overlay)

    callback({ title: 'transmit-props-title' })

    await toModalExists(true)

    expect(queryModalTitle().textContent).toBe('transmit-props-title')

    resolve()

    await toModalExists(false)
  })
})
