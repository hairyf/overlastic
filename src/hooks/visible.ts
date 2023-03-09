import { ref } from 'vue'
import type { ImperativePromise } from '../transform'

export interface ExecutorPromiserOptions {
  resolve: Function
  reject: Function
  promise: ImperativePromise<any>
}

export function useVisible(promiser: ExecutorPromiserOptions, _vanish: Function) {
  const { reject, resolve, promise } = promiser

  const visible = ref(false)
  function cancel(value: any) {
    reject?.(value)
    visible.value = false
  }
  function confirm(value: any) {
    resolve?.(value)
    visible.value = false
  }
  function vanish() {
    _vanish?.()
    reject?.()
  }

  promise.confirm = confirm
  promise.cancel = cancel

  return { visible, confirm, cancel, vanish }
}
