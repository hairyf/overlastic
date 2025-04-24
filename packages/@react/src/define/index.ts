import type { ImperativeOverlay } from '@overlastic/core'
import type { GlobalMountOptions } from '@vue/test-utils/dist/types'
import { constructor } from './constructor'

export const defineOverlay = constructor.define as <Props, Resolved = void>(instance: React.FC<Props>, options?: GlobalMountOptions | undefined) => ImperativeOverlay<Props, Resolved, unknown>
export const renderOverlay = constructor.render as <Props, Resolved = void>(instance: React.FC<Props>, props?: Props | undefined, options?: GlobalMountOptions | undefined) => Promise<Resolved>
