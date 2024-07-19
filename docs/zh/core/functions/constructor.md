# Constructor

`constructor` 是 `@overlastic/core` 的核心方法，代表特殊的 `overlays` 构造器，内部接收挂载弹出层所需的所有信息，并实现 `overlays` 层的挂载。

> 你可能不需要使用 Constructor，我们提供了不同框架的 Overlays Constructor 实现，查看 [packages](/zh/core/guide/getting-started#packages) 寻找你所使用的框架！

## Custom Constructor

通过 `createConstructor` 创建自定义的构造器，接收 `mount` 函数，内部传参包含 `component`、`props`、`options`，其中 `options` 是挂载的配置。

```ts
export interface CustomComponent {
  (props: any): Element
}

export interface CustomOptions {
  // 你的自定义配置
  className?: string
}

const constructor = createConstructor<CustomComponent, CustomOptions>(
  (component, props, options) => {
    // options 包含传入的自定义配置
    const { container, id, index, deferred, className } = options

    function vanish() {
      container.remove()
    }

    const inst = component({
      ...props,
      // 将承诺者传递给组件
      deferred,
      // 将销毁的方法传递给组件
      vanish
    })

    // 使用自定义配置
    if (className)
      inst.classList.add(className)

    // 挂载元素
    container.append(inst)
  }
)
```

## Use Constructor

`createConstructor` 返回 `define`、`render` 方法，`define` 用于定义命令式回调，而 `render` 则直接渲染

```ts
function Component(props) {
  const element = document.createElement('div')
  element.classList.add('dialog-mask')
  element.innerHTML = `
    <div class="dialog-card">
      <div class="dialog-title">${props.title || 'Dialog'}</div>
      <div class="dialog-content">${props.content}</div>
      <div class="dialog-footer">
        <button class="confirm"> confirm </button>
        <button class="close"> close </button>
      </div>
    </div>
  `

  // 添加导致弹出层结束的事件
  element.querySelector('button.confirm').onclick = function () {
    props.deferred.resolve('ok')
  }

  // 添加导致弹出层弹出的事件
  element.querySelector('button.close').onclick = function () {
    props.deferred.reject('close')
  }

  // 当外部或组件触发了 deferred，进行销毁组件
  props.deferred.finally(() => props.vanish())

  return element
}

// 定义命令式回调
const callback = constructor.define(Component, { className: 'custom-class' })
```

通过使用 `constructor.define` 所定义的命令式回调挂载自定义的组件，并获得返回值。

```ts
const result = await callback({
  title: '再见',
  content: '机遇不一定有，但来了一定要把握'
})

// result: ok
```

或者通过使用 `constructor.render` 直接渲染组件。

```ts
const result = await constructor.render(Component, {
  title: '再见',
  content: '机遇不一定有，但来了一定要把握'
})
// result: ok
```
