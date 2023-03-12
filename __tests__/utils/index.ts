import type { VueWrapper } from '@vue/test-utils'

export function confirm() {
  const element = document.querySelector('.modal__confirm') as HTMLDivElement
  if (element)
    element.click()
}

export function cancel() {
  const element = document.querySelector('.modal__cancel') as HTMLDivElement
  if (element)
    element.click()
}

export function queryModalWrapper() {
  return document.querySelector('.base-modal__mask')!
}

export function queryModalTitle() {
  return document.querySelector('.base-modal__title')!
}

export function isModalExists() {
  return !!queryModalWrapper()
}
export function isBasicExists() {
  return !!document.querySelector('.basic')
}

export function clear() {
  queryModalWrapper()?.remove()
}

export function queryTransitionParent(element: Element) {
  return element.parentElement?.parentElement?.parentElement
}

export function openModal(wrapper: VueWrapper<any>) {
  wrapper.get<HTMLDivElement>('.modal__open').element.click()
}
