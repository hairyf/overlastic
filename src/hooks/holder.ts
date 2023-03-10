import type { Component } from 'vue'
import { Teleport, h, nextTick, provide, reactive, ref } from 'vue'

import mitt from 'mitt'

import type { MountOptions } from '../helper'
import { defineProviderComponent } from '../helper'
import { createImperativePromiser } from '../utils'
import { OverlayMetaKey } from '../internal'
import type { ImperativeOverlay } from '../transform'
import type { VisiblePromiseOptions } from './visible'
import { useVisibleScripts } from './visible'

export type InjectionHolder<Props, Resolved> = [Component, ImperativeOverlay<Props, Resolved>]

export function useInjectionHolder<Props, Resolved = void>(
  component: Component,
  options: Omit<MountOptions, 'appContext'> = {},
): InjectionHolder<Props, Resolved> {
  const { callback, scripts, props, refresh } = useRefreshMetadata()

  function render() {
    return h(Teleport,
      { to: options.root || document.body },
      [h(component, props.value)],
    )
  }

  const holder = defineProviderComponent(component, {
    render: false,
    setup() {
      provide(OverlayMetaKey, scripts)
      return () => refresh.value ? render() : null
    },
  })

  return [holder, callback as any]
}

export function useRefreshMetadata() {
  const visible = ref(false)
  const refresh = ref(false)
  const events = mitt()
  const props = ref<any>()
  const options = reactive<VisiblePromiseOptions>({
    events,
    vanish,
  })

  function vanish() {
    refresh.value = false
    props.value = {}
    events.off('*')
  }

  async function callback(_props: any) {
    props.value = _props
    refresh.value = true
    await nextTick()
    visible.value = true
    const promiser = createImperativePromiser()
    Object.assign(options, { promiser })
    return promiser.promise
  }

  const scripts = useVisibleScripts(visible, options)

  return { callback, scripts, props, refresh }
}
