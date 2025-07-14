import { useDisclosure,PropsWithOverlays } from '@overlastic/react'
import { Modal } from 'antd'

export default function Basic(props: PropsWithOverlays<{}, string>) {
  const { visible, close } = useDisclosure()
  return (
    <Modal
      title="asdasdasdad"
      centered
      open={visible}
      onCancel={close}
      onClose={close}
    >
      asdasd
    </Modal>
  )
}
