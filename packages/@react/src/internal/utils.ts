import type { FC } from 'react'

export function defineAnonymousComponent(component: FC) {
  return ({ '--': component })['--']
}
