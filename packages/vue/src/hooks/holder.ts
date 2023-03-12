import type { Component } from 'vue-demi'
import { Teleport, defineComponent, h, nextTick, provide, reactive, ref } from 'vue-demi'

import { createImperativePromiser, varName } from '@unoverlays/utils'
import { pascalCase } from 'pascal-case'
import type { MountOptions } from '../types'
import type { ImperativeOverlay } from '../transform'
import { OverlayMetaKey } from '../internal'
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
      { to: options.root || document.body, disabled: options.root === false },
      h('div', { id: name }, [h(component, props.value)]),
    )
  }

  const Provider = defineComponent({
    name: pascalCase(name),
    setup() {
      provide(OverlayMetaKey, scripts)
      return () => refresh.value ? render() : null
    },
  })

  return [callback as any, Provider]
}

export function useRefreshMetadata() {
  const visible = ref(false)
  const refresh = ref(false)
  const props = ref<any>()
  const options = reactive<VisiblePromiseOptions>({
    vanish,
  })
  const scripts = useVisibleScripts(visible, options)

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
