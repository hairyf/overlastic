import type { Deferred } from '@overlastic/core'
import { createDeferred } from '@overlastic/core'
import { ref } from 'vue-demi'

export interface ScriptsOptions {
  deferred: Deferred
  vanish?: () => void
}

export function createScripts(options: ScriptsOptions) {
  const { reject: _reject } = options.deferred || {}
  const { vanish: _vanish } = options

  const visible = ref(false)

  function vanish() {
    _vanish?.()
    _reject?.()
  }

  return {
    confirm: options.deferred.resolve,
    cancel: options.deferred.reject,
    close: () => options.deferred.resolve(),
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
    scripts.reject()
  }

  function callback(_props: any) {
    scripts.deferred = createDeferred()
    scripts.resolve = scripts.deferred.resolve
    scripts.reject = scripts.deferred.reject

    props.value = _props
    refresh.value = true

    return scripts.deferred
  }

  return { callback, scripts, props, refresh }
}
