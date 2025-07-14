import type { PropsWithChildren } from 'react'
import type { PropsWithOverlays } from '../../src'
import { useDisclosure } from '../../src'

export type OverlayProps = PropsWithOverlays<PropsWithChildren<{ duration?: number, title?: string }>>

function Overlay(props: OverlayProps) {
  const { confirm, cancel, visible } = useDisclosure({
    props,
    duration: props.duration,
  })

  return visible
    ? (
        <div className="base-modal__mask">
          <div className="base-modal__content">
            <div className="base-modal__title">
              {props.title || 'Title'}
            </div>
            {props.children}
            <div className="base-modal__control">
              <span className="modal__confirm" onClick={() => confirm('confirm')}>confirm</span>
              <span className="modal__cancel" onClick={() => cancel('cancel')}>cancel</span>
            </div>
          </div>
        </div>
      )
    : null
}
export default Overlay
