import type { Component } from 'vue-demi'
import { Teleport, h, nextTick, provide, reactive, ref } from 'vue-demi'

import mitt from 'mitt'

import type { MountOptions } from '../helper'
import { defineProviderComponent } from '../helper'
import { createImperativePromiser, varName } from @unified-overlay/utils
import { OverlayMetaKey } from '../internal'
import type { ImperativeOverlay } from '../transform'
import type { VisiblePromiseOptions } from './visible'
import { useVisibleScripts } from './visible'

export type InjectionHolder<Props, Resolved> = [ImperativeOverlay<Props, Resolved>, Component]

export function useInjectHolder<Props, Resolved = void>(
  component: Component,
  options: Omit<MountOptions, 'appContext'> = {},
): InjectionHolder<Props, Resolved> {
  const { callback, scripts, props, refresh } = useRefreshMetadata()
  const name = varName(options.id, options.autoIncrement)

  function render() {
    return h(Teleport,
      { to: options.root || document.body, disabled: !!(options.root === false) },
      [
        h('div', { id: name }, [h(component, props.value)]),
      ],
    )
  }

  const holder = defineProviderComponent(component, {
    render: false,
    setup() {
      provide(OverlayMetaKey, scripts)
      return () => refresh.value ? render() : null
    },
  })

  return [callback as any, holder]
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
  const scripts = useVisibleScripts(visible, options)

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

  return { callback, scripts, props, refresh }
}
