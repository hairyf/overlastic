import type { ImperativeOverlay, MountOptions } from '@overlastic/core'
import type { AbstractFn } from '../types'
import type { VMountOptions } from './constructor'
import { constructor } from './constructor'

export const defineOverlay = constructor.define as <Component extends AbstractFn, Resolved = any>(instance: Component, options?: MountOptions<VMountOptions> | undefined) => ImperativeOverlay<InstanceType<Component>['$props'], Resolved, VMountOptions>

export const renderOverlay = constructor.render as <Component extends AbstractFn, Resolved = any>(instance: Component, props?: InstanceType<Component>['$props'] | undefined, options?: MountOptions<VMountOptions> | undefined) => Promise<Resolved>
