import type { Deferred } from '@overlastic/core'
import { createDeferred } from '@overlastic/core'
import { useRef, useState } from 'react'

export interface ScriptsOptions {
  deferred: Deferred
  vanish?: () => void
}

export function createScripts(options: ScriptsOptions) {
  const { reject: _reject } = options.deferred || {}
  const { vanish: _vanish } = options

  const [visible, change] = useState(false)

  function vanish() {
    _vanish?.()
    _reject?.()
  }

  return {
    confirm: options.deferred.resolve,
    cancel: options.deferred.reject,
    close: () => options.deferred.resolve(),
    deferred: options.deferred,
    change,
    visible,
    vanish,
  }
}

export function createRefreshMetadata() {
  const [props, setProps] = useState<any>()
  const [refresh, setRefresh] = useState(false)
  const [visible, change] = useState(false)

  const deferred = useRef<Deferred>({} as any)

  const scripts = {
    deferred: deferred.current,
    confirm: deferred.current.resolve,
    cancel: deferred.current.reject,
    close: () => deferred.current.resolve(),
    vanish,
    visible,
    change,
  }

  function vanish() {
    setRefresh(false)
    setProps({})
    scripts.cancel?.()
  }

  async function callback(props: any) {
    deferred.current = createDeferred()

    setProps(props)
    setRefresh(true)

    return deferred.current
  }

  return { callback, scripts, props, refresh }
}
