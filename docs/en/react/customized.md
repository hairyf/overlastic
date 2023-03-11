# 🏔️ Custom Components

Take [antd(drawer)](https://ant.design/components/drawer-cn) as an example (of course, you can use other component libraries)

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
      {/* Custom contents.... */}
      <Button type="primary" onClick={onConfirm}> Confirm </Button>
    </Drawer>
  )
}

export default MyDrawer
```