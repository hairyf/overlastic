<p align="center">
  <img src="https://github.com/hairyf/overlastic/raw/master/docs/public/logo.svg" style="width:120px;" />
</p>

<h1 align="center">Overlastic</h1>

<p align="center">
  A create modal | dialog | popup promise deferred library
</p>

<p align="center">
  <a href="https://www.npmjs.com/@overlastic/core"><img src="https://img.shields.io/npm/v/@overlastic/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/@overlastic/core"><img src="https://img.shields.io/npm/l/@overlastic/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/@overlastic/core"><img src="https://img.shields.io/npm/dm/@overlastic/core.svg" alt="NPM Downloads" /></a>
</p>

<p align="center">
  English | <a href="https://github.com/hairyf/overlastic/blob/master/README_CN.md">Chinese</a> | <a href="https://overlastic.vercel.app">Docs</a>
</p>

    Unified Overlays are used to create callback methods for
    components and also support declarative use of Vue, React, and other components.

###### Features

- 💫 Simplify the create message or dialog and call your UI as a promise
- 🧩 Integration and customization of existing component libraries
- 🦾 provide secure type prompts for each constructor
- ➿ Supports component inheritance of global application context

## Packages

- [@overlastic/vanilla](https://overlastic.vercel.app/element/)
- [@overlastic/react](https://overlastic.vercel.app/react/)
- [@overlastic/vue](https://overlastic.vercel.app/vue/)
- [@overlastic/svelte](https://overlastic.vercel.app/svelte/)
- [@overlastic/core](https://overlastic.vercel.app/functions/constructor.html)

## Devtools

Components created by Unified Overlays support Devtools for their corresponding frameworks (React, Vue).

###### Supported

| React Developer Tools | Vue.js Devtools                  |
| --------------------- | -------------------------------- |
| ✅<sup>(holder)</sup> | ✅<sup>(holder\|child-app)</sup> |

- `holder` inserts a holder into the corresponding component, making it available in the virtual DOM.
- `child-app` creates a separate application that can be recognized by devtools.

## Why?

Creating Model classes repetitive and time-consuming. When reusing a component that uses a Model class, common fields such as cancel, confirm, and visible need to be defined repeatedly. Additionally, controlling the Model process (`clear data` -> `open model` -> `edit data` -> `onConfirm` -> `save data`) can lead to a lot of redundant code, especially for frequently used components like an image selector.

Unified Overlays simplifies modal creation by unifying the redundant processes and state management. It can effectively create imperative components, and can still be used declaratively.

## Install

```
pnpm add @overlastic/vue
# Or React
pnpm add @overlastic/react
```

## Usage

Use the `useDisclosure` Hook provided by overlays to obtain overlays metadata and create overlays components (Vue, React).

```ts
// In your Vue, React overlays component,
// use useDisclosure to obtain overlays metadata.
const { visible, confirm, cancel } = useDisclosure({
  // The duration of the overlays duration prevents
  // the component from being destroyed too early.
  duration: 1000
})
```

Use `defineOverlay|renderOverlay` to convert to a callback (imperative) method.

```ts
const callback = defineOverlay(Component)
const result = await callback(props)
```

---

```ts
const result = renderOverlay(Component, props)
```

# License

[MIT](LICENSE) Copyright (c) 2019-PRESENT
