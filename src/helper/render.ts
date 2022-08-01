import type { Component, VNode } from 'vue-demi'
import { createVNode, defineComponent, h, render } from 'vue-demi'
import { context } from '../internal'
import type { MountOverlayOptions } from './interface'

export interface RenderInstanceOptions extends MountOverlayOptions {
  provide?: (vnode: VNode, vanish: Function) => void
}

/**
 * 渲染组件实例
 * @param component 组件
 * @param props 组件参数
 * @param options 配置
 * @returns 组件实例
 */
export const renderInstance = (
  component: Component,
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
  const Provider = defineComponent({
    name: `${component.name}OverlayProvider`,
    setup() {
      options.provide?.(vnode, vanish)
    },
    render() {
      return h(component as any, props)
    },
  })

  // 创建虚拟节点, 渲染组件
  const container = document.createElement('div')
  container.className = 'overlay-container'
  const vnode = createVNode(Provider, props)

  vnode.appContext = options.appContext || context.appContext

  render(vnode, container)

  // append document.body
  if (container.firstElementChild) {
    const root = options.root || document.body
    root.append(container.firstElementChild)
  }

  return { vanish, vnode }
}
