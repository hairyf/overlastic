import type { FunctionComponent, PropsWithChildren } from 'react'
import { createContext, useState } from 'react'
import type { OverlayMeta } from '../hooks'

export const OverlayContext = createContext<Partial<OverlayMeta>>({})

interface ProviderProps extends PropsWithChildren<Partial<OverlayMeta>> {}

export const UnifiedOverlayProvider: FunctionComponent<ProviderProps> = (props) => {
  const [visible, setVisible] = useState(false)
  const { children, ...metadata } = props
  return (
    <OverlayContext.Provider value={{ visible, setVisible, ...metadata }}>
        {children}
    </OverlayContext.Provider>
  )
}
