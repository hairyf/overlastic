# 🏔️ 定制化弹出层

以 [antd(drawer)](https://ant.design/components/drawer-cn) 为例（其他组件库同理）

```tsx
import type { PropsWithOverlays } from '@overlays/react'
import { useOverlayMeta } from '@overlays/react'
import { Button, Drawer } from 'antd'

const MyDrawer = (props: PropsWithOverlays<{ title: string }>) => {

  const { visible, resolve, reject } = useOverlayMeta({
    props
  })

  const onResolve = () => {
    resolve(`${props.title}:confirmed`)
  }

  return (
    <Drawer title={props.title} onClose={reject} open={visible}>
      {/* 定制化内容.... */}
      <Button type="primary" onClick={onResolve}> Confirm </Button>
    </Drawer>
  )
}

export default MyDrawer
```