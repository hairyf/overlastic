# What is overlays?

Overlastic is a unified plugin for building overlays that allows the creation of callback (imperative) methods and the use of Template/JSX (declarative) in Vue Template or React Jsx.

###### Features

- 💫 Simplify the create message or dialog and call your UI as a promise
- 🧩 Integration and customization of existing component libraries
- 🦾 provide secure type prompts for each constructor
- ➿ Supports component inheritance of global application context

## Packages

- [@overlastic/vanilla](/en/core/element/)
- [@overlastic/react](/en/core/react/)
- [@overlastic/vue](/en/vue/)
- [@overlastic/svelte](/en/core/svelte/)
- [@overlastic/core](/en/core/functions/constructor.html)

## Devtools

Components created by Unified Overlays support Devtools for their corresponding frameworks.

| React Developer Tools | Vue.js Devtools                 |
| --------------------- | ------------------------------- |
| ✅<sup>(holder\|provider)</sup>  | ✅<sup>(holder\|child-app\|provider)</sup> |

## Why use overlays?

Creating Model classes repetitive and time-consuming. When reusing a component that uses a Model class, common fields such as reject, resolve, and visible need to be defined repeatedly. Additionally, controlling the Model process (`clear data` -> `open model` -> `edit data` -> `onConfirm` -> `save data`) can lead to a lot of redundant code, especially for frequently used components like an image selector.

overlays simplifies Modal creation by unifying the redundant processes and state management. It can effectively create imperative components, and can still be used declaratively.
