/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactDOM from 'react-dom'
import React from 'react'
import type { MountOptions } from '../../types'
import { createGlobalNode, varName } from '../../utils'

export function renderReactDOM(
  Component: React.Component,
  props?: Record<string, any>,
  options: MountOptions = {},
) {
  const name = varName(options.id, options.autoIncrement)
  const container = createGlobalNode(name, options.root || document.body)
  function vanish() {
    ReactDOM.unmountComponentAtNode(container)
    container.parentNode?.removeChild(container)
  }

  // @ts-expect-error
  ReactDOM.render(<Component {...props} />, container)

  return vanish
}
