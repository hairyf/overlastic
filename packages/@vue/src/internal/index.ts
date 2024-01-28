import type { AppContext, Component, InjectionKey } from 'vue-demi'
import type { UseOverlayReturn } from '../composable'

export const context = {
  appContext: null as null | AppContext,
}

export const ScriptsInjectionKey: InjectionKey<UseOverlayReturn> = Symbol('OverlayScripts')
export const InstancesInjectionKey: InjectionKey<{
  render: (instance: Component, props: any) => void
  vanish: (instance: Component) => void
}> = Symbol('OverlayInstances')
