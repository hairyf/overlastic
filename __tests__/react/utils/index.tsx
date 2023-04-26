/* eslint-disable import/export */

import '@testing-library/dom'

export * from '@testing-library/react'

export { default as userEvent } from '@testing-library/user-event'
export { render } from './render'
export { mount } from './mount'
export type { MountingOptions } from './mount'
