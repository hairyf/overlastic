# Customized

You can customize existing components or component libraries using `@overlastic/react`. Here's an example using [Ant Design's Drawer component](https://ant.design/components/drawer) as a reference:

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
