import React from 'react'
import { defineGlobalNode, varName } from '@unoverlays/utils'
import { createRoot } from 'react-dom/client'
import { pascalCase } from 'pascal-case'
import type { MountOptions } from '../types'
import { OverlayContext } from './internal'
import { defineProviderComponent } from './define'

export interface RenderOptions extends MountOptions {
  setup?: () => any
}

export function renderReactDOM(
  Component: React.FC<any>,
  props?: Record<string, any>,
  options: RenderOptions = {},
) {
  const name = varName(options.id, options.autoIncrement)
  const container = defineGlobalNode(name, options.root || document.body)

  function vanish() {
    requestAnimationFrame(() => {
      root.unmount()
      container.remove()
    })
  }

  const UnifiedOverlayProvider = defineProviderComponent(() => {
    const scripts = options.setup?.()
    return (
      <OverlayContext.Provider
        value={scripts}
        children={<Component {...props} />}
        {...{ id: pascalCase(name) }}
      />
    )
  })

  const root = createRoot(container)

  root.render(<UnifiedOverlayProvider />)

  return { vanish }
}
