import { ref } from 'vue'
import type { ExePromiserOptions } from '../transform'

export function useVisible(promiser: ExePromiserOptions, _vanish: Function) {
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
