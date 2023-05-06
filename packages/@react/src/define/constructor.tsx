import { createConstructor } from '@overlays/core'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { pascalCase } from 'pascal-case'
import { useVisibleScripts } from '../composable'
import { Context, defineProviderComponent } from '../internal'

export const constructor = createConstructor<React.FC<any>>((Inst, props, options) => {
  const { container, id, deferred } = options

  const root = createRoot(container)

  const Provider = defineProviderComponent(() => {
    const scripts = useVisibleScripts({ deferred, vanish })
    return (
      <Context.Provider
        value={scripts}
        children={<Inst {...props} />}
        {...{ id: pascalCase(id) }}
      />
    )
  })

  function vanish() {
    const handle = requestAnimationFrame(() => {
      root.unmount()
      container.remove()
      cancelAnimationFrame(handle)
    })
  }

  root.render(<Provider />)
})
