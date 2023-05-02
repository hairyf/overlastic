import type { Promiser } from '@overlays/core'

export interface Context<T = void> {
  resolve: Promiser<T>['resolve']
  reject: Promiser<T>['reject']
  promiser: Promiser<T>
  vanish: Function
}
