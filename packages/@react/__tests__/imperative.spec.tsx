import { delay } from '@overlastic/core'
import { describe, expect, it } from 'vitest'
import { clear, isModalExists, queryModalTitle, cancel, confirm } from '../../__tests__'
import { defineOverlay, renderOverlay } from '../src'
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

  it('emit:confirm', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    expect(callback()).confirms.toBe('confirm')

    await toModalExists(true)

    confirm()

    await toModalExists(false)
  })

  it('emit:cancel', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    callback()

    await toModalExists(true)

    cancel()

    await toModalExists(false)
  })

  it('manual:confirm', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    const instance = callback()

    expect(instance).confirms.toBe('manual-confirm')

    await toModalExists(true)

    instance.confirm('manual-confirm')

    await toModalExists(false)
  })

  it('manual:cancel', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)
    const instance = callback()

    await toModalExists(true)

    expect(instance).cancels.toBe('manual-cancel')

    instance.cancel('manual-cancel')

    await toModalExists(false)
  })

  it('manual:not-allowed', async () => {
    const callback = defineOverlay<unknown, string>(Overlay)

    const instance = callback()

    await toModalExists(true)

    await instance.confirm('manual:not-allowed')

    await toModalExists(false)
  })

  it('transmit:props', async () => {
    const callback = defineOverlay<{ title?: string }, string>(Overlay)

    callback({ title: 'transmit-props-title' })

    await toModalExists(true)

    expect(queryModalTitle().textContent).toBe('transmit-props-title')

    confirm()

    await toModalExists(false)
  })
})
