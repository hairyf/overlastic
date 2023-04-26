import { render as _render } from '@testing-library/react'

// override render export
export function render(ui: any, options = {}) {
  return _render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }: any) => children,
    ...options,
  })
}
