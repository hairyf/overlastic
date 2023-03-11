import ReactDOM from 'react-dom'
import React from 'react'
import { createGlobalNode, varName } from '@unoverlays/utils'
import type { MountOptions } from '../types'
import { OverlayContext } from '../internal'

export interface RenderOptions extends MountOptions {
  setup?: () => any
}

export function renderReactDOM(
  Component: React.FC<any>,
  props?: Record<string, any>,
  options: RenderOptions = {},
) {
  const name = varName(options.id, options.autoIncrement)
  const container = createGlobalNode(name, options.root || document.body)

  function vanish() {
    ReactDOM.unmountComponentAtNode(container)
    container.parentNode?.removeChild(container)
  }

  function UnifiedOverlayProvider() {
    const scripts = options.setup?.()
    return (
      <OverlayContext.Provider value={scripts}>
        <Component {...props} />
      </OverlayContext.Provider>
    )
  }

  ReactDOM.render(<UnifiedOverlayProvider />, container)

  return { vanish }
}
