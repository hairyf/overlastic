import { createOverlaysConstructor } from '@overlays/core'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { pascalCase } from 'pascal-case'
import { useVisibleScripts } from '../composable'
import { defineProviderComponent } from './define'
import { OverlayContext } from './internal'

export const constructor = createOverlaysConstructor<React.FC<any>>((Inst, props, options) => {
  const { container, id, promiser } = options

  function vanish() {
    const handle = requestAnimationFrame(() => {
      root.unmount()
      container.remove()
      cancelAnimationFrame(handle)
    })
  }

  const UnifiedOverlayProvider = defineProviderComponent(() => {
    const scripts = useVisibleScripts({ promiser, vanish })
    return (
      <OverlayContext.Provider
        value={scripts}
        children={<Inst {...props} />}
        {...{ id: pascalCase(id) }}
      />
    )
  })

  const root = createRoot(container)

  root.render(<UnifiedOverlayProvider />)
})
