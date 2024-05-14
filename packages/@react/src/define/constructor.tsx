import { createConstructor } from '@overlastic/core'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { pascalCase } from 'pascal-case'
import { useScripts } from '../composable'
import { ScriptsContext, defineAnonymousComponent } from '../internal'

export const constructor = createConstructor<React.FC<any>>((Instance, props, options) => {
  const { container, id, deferred } = options

  const root = createRoot(container)

  const Provider = defineAnonymousComponent(() => {
    return (
      <ScriptsContext.Provider
        value={useScripts({ deferred, vanish })}
        {...{ id: pascalCase(id) }}
      >
        <Instance {...props} />
      </ScriptsContext.Provider>
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
