import type { Component } from 'vue-demi'
import { Teleport, defineComponent, h, nextTick, provide, ref } from 'vue-demi'

import { createPromiser, defineName } from '@overlays/core'
import { pascalCase } from 'pascal-case'
import type { GlobalMountOptions, ImperativeOverlay } from '@overlays/core'
import { OverlayMetaKey } from '../internal'

export type InjectionHolder<Props, Resolved> = [Component, ImperativeOverlay<Props, Resolved>]

export function useInjectHolder<Props, Resolved = void>(
  component: Component,
  options: Omit<GlobalMountOptions, 'appContext'> = {},
): InjectionHolder<Props, Resolved> {
  const { callback, scripts, props, refresh } = useRefreshMetadata()
  const name = defineName(options.id, options.autoIncrement)

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
  let promiser: any

  const scripts = {
    vanish,
    resolve,
    reject,
    visible,
  }

  function resolve(value?: any) {
    promiser.resolve(value)
    visible.value = false
  }
  function reject(value?: any) {
    promiser.reject(value)
    visible.value = false
  }

  function vanish() {
    refresh.value = false
    props.value = {}
    reject()
  }

  async function callback(_props: any) {
    promiser = createPromiser()

    props.value = _props
    refresh.value = true
    await nextTick()
    visible.value = true

    return promiser
  }

  return { callback, scripts, props, refresh }
}
