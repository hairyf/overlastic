import type { Deferred } from '@overlastic/core'
import { createDeferred } from '@overlastic/core'
import { useRef, useState } from 'react'

export interface ScriptsOptions {
  deferred: Deferred
  vanish?: () => void
}

export function createScripts(options: ScriptsOptions) {
  const { cancel: _cancel } = options.deferred || {}
  const { vanish: _vanish } = options

  const [visible, change] = useState(false)

  function vanish() {
    _vanish?.()
    _cancel?.()
  }

  return {
    confirm: options.deferred.confirm,
    cancel: options.deferred.cancel,
    close: () => options.deferred.confirm(),
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
    confirm: deferred.current.confirm,
    cancel: deferred.current.cancel,
    close: () => deferred.current.confirm(),
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
