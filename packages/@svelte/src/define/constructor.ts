import { createConstructor } from '@overlastic/core'
import { injectOverlayKey } from '../internal'

export interface SMountOptions {
  /** current app context */
  context?: Map<any, any>
}

export const constructor = createConstructor<any, SMountOptions>((Inst, props, options) => {
  const { container, deferred, context: _context = new Map() } = options

  function vanish() {
    childApp.$destroy()
    container.remove()
  }

  const context = new Map([..._context.entries()])

  context.set(injectOverlayKey, {
    resolve: deferred.resolve,
    reject: deferred.reject,
    deferred,
    visible: false,
    vanish,
  })

  const childApp = new Inst({
    target: container,
    props,
    context,
  })
})
