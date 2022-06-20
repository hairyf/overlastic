import type { Component, VNode } from 'vue'
import { defineComponent, h, render } from 'vue'

export interface RenderInstanceOptions {
  setup?: (vnode: VNode, vanish: Function) => void
  root?: HTMLElement
}
/**
 * 渲染组件实例
 * @param Constructor 组件
 * @param props 组件参数
 * @param options 配置
 * @returns 组件实例
 */
export const renderInstance = (
  Constructor: Component,
  props?: Record<string, any>,
  options: RenderInstanceOptions = {},
) => {
  // 组件消失时, 移除当前实例
  // 这里不需要调用 document.body.removeChild(container.firstElementChild)
  // 因为调用 render(null, container) 为我们完成了这项工作
  const vanish = () => {
    render(null, container)
  }

  // 创建高阶组件, 注入销毁方法与组件
  const Component = defineComponent({
    setup: () => {
      options.setup?.(vnode, vanish)
    },
    render() {
      return h(Constructor as any, props)
    },
  })

  // 创建虚拟节点, 渲染组件
  const container = document.createElement('div')
  const vnode = h(Component, props)
  render(vnode, container)

  // append document.body
  if (container.firstElementChild) {
    const root = options.root || document.body
    root.append(container.firstElementChild)
  }

  return { vanish, vnode }
}
