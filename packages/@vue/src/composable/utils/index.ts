import type { Deferred } from '@overlastic/core'
import { createDeferred } from '@overlastic/core'
import { ref } from 'vue-demi'

export interface ScriptsOptions {
  deferred: Deferred
  vanish?: () => void
}

export function createScripts(options: ScriptsOptions) {
  const { cancel: _cancel } = options.deferred || {}
  const { vanish: _vanish } = options

  const visible = ref(false)

  function vanish() {
    _vanish?.()
    _cancel?.()
  }

  return {
    confirm: options.deferred.confirm,
    cancel: options.deferred.cancel,
    close: () => options.deferred.confirm(),
    deferred: options.deferred,
    visible,
    vanish,
  }
}

export function createRefreshMetadata() {
  const visible = ref(false)
  const refresh = ref(false)
  const props = ref<any>()

  const scripts: any = { vanish, visible }

  function vanish() {
    refresh.value = false
    props.value = {}
    scripts.cancel()
  }

  function callback(_props: any) {
    scripts.deferred = createDeferred()
    scripts.confirm = scripts.deferred.confirm
    scripts.cancel = scripts.deferred.cancel

    props.value = _props
    refresh.value = true

    return scripts.deferred
  }

  return { callback, scripts, props, refresh }
}
