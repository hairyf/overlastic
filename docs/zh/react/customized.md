# 🏔️ 定制化弹出层

以 [antd(drawer)](https://ant.design/components/drawer-cn) 为例（其他组件库同理）

```tsx
import type { PropsWithOverlays } from '@unoverlays/react'
import { useOverlayMeta } from '@unoverlays/react'
import { Button, Drawer } from 'antd'

const MyDrawer = (props: PropsWithOverlays<{ title: string }>) => {

  const { visible, confirm, cancel } = useOverlayMeta({
    props
  })

  const onConfirm = () => {
    confirm(`${props.title}:confirmed`)
  }

  return (
    <Drawer title={props.title} onClose={cancel} open={visible}>
      {/* 定制化内容.... */}
      <Button type="primary" onClick={onConfirm}> Confirm </Button>
    </Drawer>
  )
}

export default MyDrawer
```