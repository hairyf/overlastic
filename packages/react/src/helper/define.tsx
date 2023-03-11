import type { FunctionComponent, PropsWithChildren } from 'react'
import type { OverlayMeta } from '../hooks'
import { OverlayContext } from '../internal'

interface ProviderProps extends PropsWithChildren<Partial<OverlayMeta>> {}

export const UnifiedOverlayProvider: FunctionComponent<ProviderProps> = (props) => {
  const { children, ...metadata } = props
  return (
    <OverlayContext.Provider value={metadata as any}>
        {children}
    </OverlayContext.Provider>
  )
}
