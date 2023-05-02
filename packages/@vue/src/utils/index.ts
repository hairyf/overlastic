import type { App, AppContext } from 'vue'
import { context } from '../internal'

export function inheritParent(app: App<Element>, appContext?: AppContext) {
  const parent = appContext?.app || context.appContext?.app
  if (parent) {
    app.config.globalProperties = parent.config.globalProperties
    Object.assign(app._context, parent._context)
  }
}
