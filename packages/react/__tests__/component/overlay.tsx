import type { PropsWithChildren } from 'react'
import type { PropsWidthOverlays } from '../../src'
import { useOverlayMeta } from '../../src'

export type OverlayProps = PropsWidthOverlays<PropsWithChildren<{ animation?: number; title?: string }>>

function Overlay(props: OverlayProps) {
  const { resolve, reject, visible } = useOverlayMeta({
    props,
    animation: props.animation,
  })

  return visible
    ? <div className='base-modal__mask'>
    <div className='base-modal__content'>
      <div className='base-modal__title'>
        {props.title || 'Title'}
      </div>
      {props.children}
      <div className='base-modal__control'>
        <span className='modal__confirm' onClick={() => resolve('resolve')}>resolve</span>
        <span className='modal__cancel' onClick={() => reject('reject')}>reject</span>
      </div>
    </div>
  </div>
    : null
}
export default Overlay
