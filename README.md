<p align="center">
<img src="docs/public/circle.svg" style="width:100px;" />
</p>

<h1 align="center">Unified Overlays</h1>

<p align="center">
A create model/dialog/popup library
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/@overlays/core">
    <img src="https://img.shields.io/npm/v/@overlays/core.svg">
  </a>
</p>

> [中文](./README_CN.md) | English or see [overlays-docs](https://overlays.vercel.app)

Unified Overlays is a unified plugin for building overlays that allows the creation of callback (imperative) methods and the use of Template/JSX (declarative) in Vue Template or React Jsx.

###### Features

- Simplify the Create Message or Dialog and Supports both callback (imperative) and Template/JSX (declarative) methods.
- Integration and customization of existing component libraries, such as `element-plus` and `antd`.
- Supports component inheritance of global application context.
- Supports frontend progressive frameworks such as `vue2|3` and `react`.
- Highly stable with **99.54%** unit test coverage(vue/react/core).

## Packages

- [@overlays/core](https://unoverlays.vercel.app/en/core/functions/globals.html) - Quick adaptation and creation of applications
- [@overlays/vue](https://unoverlays.vercel.app/en/vue/) - Use Unified Overlays to create overlays in Vue app.
- [@overlays/react](https://unoverlays.vercel.app/en/react/) - Use Unified Overlays to create overlays in React app.

## Devtools

Components created by Unified Overlays support Devtools for their corresponding frameworks (React, Vue).

###### Supported

| React Developer Tools | Vue.js Devtools                 |
| --------------------- | ------------------------------- |
| ✅<sup>(holder)</sup>  | ✅<sup>(holder\|child-app)</sup> |

- `holder` inserts a holder into the corresponding component, making it available in the virtual DOM.
- `child-app` creates a separate application that can be recognized by devtools.

## Why?

Creating Model classes repetitive and time-consuming. When reusing a component that uses a Model class, common fields such as reject, resolve, and visible need to be defined repeatedly. Additionally, controlling the Model process (`clear data` -> `open model` -> `edit data` -> `onConfirm` -> `save data`) can lead to a lot of redundant code, especially for frequently used components like an image selector.

overlays simplifies Modal creation by unifying the redundant processes and state management. It can effectively create imperative components, and can still be used declaratively.

## Install

```
pnpm add @overlays/vue
# Or React
pnpm add @overlays/react
```

## Usage

Use the `useOverlayMeta` Hook provided by overlays to obtain overlays metadata and create overlays components (Vue, React).

```ts
// In your Vue, React overlays component,
// use useOverlayMeta to obtain overlays metadata.
const { visible, resolve, reject } = useOverlayMeta({
  // The duration of the overlays animation prevents
  // the component from being destroyed too early.
  animation: 1000
})
```

Use `defineOverlay|renderOverlay` to convert to a callback (imperative) method.

```ts
const callback = defineOverlay(OverlayComponent)
const result = await callback(props)
```

---

```ts
const result = renderOverlay(OverlayComponent, {
  props
})
```

# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
