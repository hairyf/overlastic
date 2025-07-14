import { useState } from 'react'
import { useOverlay } from '../../src'
import Overlay from './overlay'

function HolderContainer(props?: { duration?: number, root?: any }) {
  const [holder, callback] = useOverlay<{ title?: string, duration?: number }, string>(Overlay, { root: props?.root, type: 'holder' })
  const [result, setResult] = useState<any>()

  async function getModalValue() {
    try {
      setResult(await callback({ title: 'holder-modal-title', duration: props?.duration }))
    }
    catch (error: any) {
      setResult(error)
    }
  }

  return (
    <div className="container">
      <div className="modal__open" onClick={() => getModalValue()}>
        Open Modal
      </div>
      <div className="modal_holder">
        {holder}
      </div>
      <span className="modal__value">
        {result}
      </span>
    </div>
  )
}

export default HolderContainer
