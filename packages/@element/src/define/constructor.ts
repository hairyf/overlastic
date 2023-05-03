import { createConstructor, delay } from '@overlays/core'
import { clearOptions, clearTrigger, setupTrigger, useOptions } from '../internal'

export interface EFComponent<T = any> {
  (props: T): HTMLElement
}

export type ElementComponent = HTMLElement | EFComponent | string

export const constructor = createConstructor<ElementComponent>((Inst, props, options) => {
  const { container, promiser } = options

  function vanish() {
    container.remove()
  }

  setupTrigger({
    resolve: promiser.resolve,
    reject: promiser.reject,
    promiser,
    vanish,
  })

  const inst = parseElement(Inst, props)
  const { duration = 0 } = useOptions()

  clearTrigger()
  clearOptions()

  promiser.finally(() => {
    delay(duration).then(vanish)
  })

  container.append(inst)
})

function parseElement(component: ElementComponent, props: Record<string, any>) {
  if (typeof component === 'function')
    return component(props)

  const element: HTMLElement
   = typeof component === 'string'
     ? document.createElement(component)
     : component

  for (const [key, value] of Object.entries(props))
    element.setAttribute(key, value)

  return element
}
