import type { FC } from 'react'

export const defineProviderComponent = (component: FC) => {
  return ({ '--': component })['--']
}
