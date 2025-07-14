import type { Deferred } from '@overlastic/core'

export interface Context<T = void> {
  confirm: Deferred<T>['confirm']
  cancel: Deferred<T>['cancel']
  deferred: Deferred<T>
  vanish: () => void
}
