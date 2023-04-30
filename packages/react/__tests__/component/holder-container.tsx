import { useInjectHolder } from '@unoverlays/react'
import { useState } from 'react'
import Overlay from './overlay'
function HolderContainer(props?: { animation?: number; root?: any }) {
  const [holder, callback] = useInjectHolder<{ title?: string; animation?: number }, string>(Overlay, { root: props?.root })
  const [result, setResult] = useState<any>()

  async function getModalValue() {
    try {
      setResult(await callback({ title: 'holder-modal-title', animation: props?.animation }))
    }
    catch (error: any) {
      setResult(error)
    }
  }

  return <div className='container'>
    <div className="modal__open" onClick={() => getModalValue()}>
      Open Modal
    </div>
    <div className='modal_holder'>
    {holder}
    </div>
    <span className='modal__value'>
      {result}
    </span>
  </div>
}

export default HolderContainer
