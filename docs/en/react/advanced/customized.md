#  Custom Components

Take [antd(drawer)](https://ant.design/components/drawer-cn) as an example (of course, you can use other component libraries)

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
      {/* Custom contents.... */}
      <Button type="primary" onClick={onResolve}> Confirm </Button>
    </Drawer>
  )
}

export default MyDrawer
```