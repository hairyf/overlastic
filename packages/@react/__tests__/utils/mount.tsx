import type { FC } from 'react'
import { act } from '@testing-library/react'
import { useState } from 'react'
import { render } from './render'

export interface MountingOptions<Props> {
  props?: Props
}

export function mount<P = unknown>(Component: FC<P>, options?: MountingOptions<P>) {
  const defaultProps = options?.props || {}
  const context = {
    props: {} as P,
    setProps: (() => {}) as (props: P) => void,
  }

  const MountContainer = () => {
    const [props, setProps] = useState(defaultProps)
    Object.assign(context, { props, setProps })
    const C = Component as any
    return <C {...props} />
  }

  const root = render(<MountContainer />)

  const wrapper = {
    props: {} as P,
    async setProps(props: P) {
      await act(async () => context.setProps(props))
    },
    get<T extends Element = Element>(selectors: string) {
      const element = document.querySelector(selectors) as T
      const isVisible = () => !!document.querySelector(selectors)
      const exists = () => !!document.querySelector(selectors)
      const text = () => document.querySelector(selectors)?.textContent || ''
      return { element, isVisible, exists, text }
    },
    unmount: root.unmount,
  }

  return wrapper
}
