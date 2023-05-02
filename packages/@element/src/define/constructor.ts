import { createConstructor } from '@overlays/core'
import type { Context } from '../types'

export interface EFComponent<T = any> {
  (props: T, context: Context): HTMLElement
}

export type ElementComponent = HTMLElement | EFComponent | string

export const constructor = createConstructor<ElementComponent>((Inst, props, options) => {
  const { container, promiser } = options

  function vanish() {
    container.remove()
  }

  const inst = parseElement(Inst, props, {
    resolve: promiser.resolve,
    reject: promiser.reject,
    promiser,
    vanish,
  })

  container.append(inst)
})

function parseElement(component: ElementComponent, props: Record<string, any>, context: Context) {
  if (typeof component === 'function')
    return component(props, context)

  const element: HTMLElement
   = typeof component === 'string'
     ? document.createElement(component)
     : component

  for (const [key, value] of Object.entries(props))
    element.setAttribute(key, value)

  return element
}
