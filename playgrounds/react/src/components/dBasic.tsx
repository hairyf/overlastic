import {usePrograms} from '@overlastic/react'
import { Modal } from 'antd'

export default function Basic() {
  const { visible,  resolve } = usePrograms({
    duration: 300,
  })
  return  <Modal
  title={'asdasdasdad'}
  centered
  open={visible}
  onCancel={() => resolve()}
  onClose={() => resolve()}
>
  asdasd
</Modal>
}