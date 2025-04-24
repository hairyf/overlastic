import type { GlobalMountOptions, ImperativeOverlay } from '@overlastic/core'

import type { AbstractFn } from '../types'
import { createDeferred, defineName } from '@overlastic/core'
import { pascalCase } from 'pascal-case'
import { defineComponent, h, provide, ref, Teleport } from 'vue-demi'
import { ScriptsInjectionKey } from '../internal'

export type InjectionHolder<Component extends AbstractFn, Resolved> = [Component, ImperativeOverlay<InstanceType<Component>['$props'], Resolved>]

export function useOverlayHolder<Component extends AbstractFn, Resolved = any>(
  component: Component,
  options: Omit<GlobalMountOptions, 'appContext'> = {},
): InjectionHolder<Component, Resolved> {
  const { callback, scripts, props, refresh } = useRefreshMetadata()
  const name = defineName(options.id, options.autoIncrement)

  function render() {
    return h(
      Teleport,
      {
        to: options.root || document.body,
        disabled: options.root === false,
      },
      h('div', { id: name }, [
        h(component as any, props.value),
      ]),
    )
  }

  const Holder = defineComponent({
    name: pascalCase(name),
    setup() {
      provide(ScriptsInjectionKey, scripts)
      return () => refresh.value ? render() : null
    },
  })

  return [Holder as any, callback as any]
}

export function useRefreshMetadata() {
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
