import type { Deferred } from '@overlays/core'

export interface Context<T = void> {
  resolve: Deferred<T>['resolve']
  reject: Deferred<T>['reject']
  deferred: Deferred<T>
  vanish: Function
}
