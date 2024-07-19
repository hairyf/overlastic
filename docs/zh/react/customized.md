# Customized

您可以使用 `@overlastic/react` 修改现有组件或组件库，拿 [antd(drawer)](https://ant.design/components/drawer-cn) 举例：

```tsx
import type { PropsWithOverlays } from '@overlastic/react'
import { useOverlayDefine } from '@overlastic/react'
import { Button, Drawer } from 'antd'

function MyDrawer(props: PropsWithOverlays<{ title: string }>) {
  const { visible, resolve, reject } = useOverlayDefine({
    duration: 200,
    props,
  })

  return (
    <Drawer title={props.title} onClose={reject} open={visible}>
      {/* Custom contents.... */}
      <Button type="primary" onClick={() => resolve(`${props.title}:confirmed`)}>
        Confirm
      </Button>
    </Drawer>
  )
}
export default MyDrawer
```
