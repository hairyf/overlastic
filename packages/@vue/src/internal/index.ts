import type { AppContext, Component, InjectionKey } from 'vue-demi'
import type { ProgramsReturn } from '../composable'

export const context = {
  appContext: null as null | AppContext,
}

export const ScriptsInjectionKey: InjectionKey<ProgramsReturn> = Symbol('OverlayScripts')
export const InstancesInjectionKey: InjectionKey<{
  render: (instance: Component, props: any) => void
  vanish: (instance: Component) => void
}> = Symbol('OverlayInstances')
