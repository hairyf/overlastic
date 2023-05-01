import type { Component } from 'vue-demi'
import { Teleport, defineComponent, h, nextTick, provide, reactive, ref } from 'vue-demi'

import { createImperativePromiser, varName } from '@overlays/core'
import { pascalCase } from 'pascal-case'
import type { GlobalMountOptions, ImperativeOverlay } from '@overlays/core'
import { OverlayMetaKey } from '../internal'
import type { VisiblePromiseOptions } from './visible'
import { useVisibleScripts } from './visible'

export type InjectionHolder<Props, Resolved> = [Component, ImperativeOverlay<Props, Resolved>]

export function useInjectHolder<Props, Resolved = void>(
  component: Component,
  options: Omit<GlobalMountOptions, 'appContext'> = {},
): InjectionHolder<Props, Resolved> {
  const { callback, scripts, props, refresh } = useRefreshMetadata()
  const name = varName(options.id, options.autoIncrement)

  function render() {
    return h(Teleport,
      { to: options.root || document.body, disabled: options.root === false },
      h('div', { id: name }, [h(component, props.value)]),
    )
  }

  const Holder = defineComponent({
    name: pascalCase(name),
    setup() {
      provide(OverlayMetaKey, scripts)
      return () => refresh.value ? render() : null
    },
  })

  return [Holder, callback as any]
}

export function useRefreshMetadata() {
  const visible = ref(false)
  const refresh = ref(false)
  const props = ref<any>()
  const options = reactive<VisiblePromiseOptions>({
    vanish,
  })
  const scripts = useVisibleScripts(options)

  function vanish() {
    refresh.value = false
    props.value = {}
  }

  async function callback(_props: any) {
    const promiser = createImperativePromiser()
    options.promiser = promiser

    props.value = _props
    refresh.value = true
    await nextTick()
    visible.value = true

    return promiser.promise
  }

  return { callback, scripts, props, refresh }
}
