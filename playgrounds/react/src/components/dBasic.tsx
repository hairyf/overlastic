import { useDisclosure } from '@overlastic/react'
import { Modal } from 'antd'

export default function Basic() {
  const { visible, close } = useDisclosure({
    duration: 300,
  })
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
