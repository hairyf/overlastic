# What is overlays?

overlays is a unified plugin for building overlays that allows the creation of callback (imperative) methods and the use of Template/JSX (declarative) in Vue Template or React Jsx.

###### Features

- Simplify the Create Message or Dialog and Supports both callback (imperative) and Template/JSX (declarative) methods.
- Integration and customization of existing component libraries, such as `element-plus` and `antd`.
- Supports component inheritance of global application context.
- Supports frontend progressive frameworks such as `vue2|3` and `react`.
- Highly stable with **99.54%** unit test coverage(vue/react/core).

## Packages

- [@overlays/vue](/en/vue/) - Use Unified Overlays to create overlays in Vue app.
- [@overlays/react](/en/react/) - Use Unified Overlays to create overlays in React app.
- [@overlays/core](/en/core/functions/constructor.html) - Quick adaptation and creation of applications

## Devtools

Components created by Unified Overlays support Devtools for their corresponding frameworks (React, Vue).

###### Supported

| React Developer Tools | Vue.js Devtools                 |
| --------------------- | ------------------------------- |
| ✅<sup>(holder)</sup>  | ✅<sup>(holder\|child-app)</sup> |

- `holder` inserts a holder into the corresponding component, making it available in the virtual DOM.
- `child-app` creates a separate application that can be recognized by devtools.

## Why use overlays?

Creating Model classes repetitive and time-consuming. When reusing a component that uses a Model class, common fields such as reject, resolve, and visible need to be defined repeatedly. Additionally, controlling the Model process (`clear data` -> `open model` -> `edit data` -> `onConfirm` -> `save data`) can lead to a lot of redundant code, especially for frequently used components like an image selector.

overlays simplifies Modal creation by unifying the redundant processes and state management. It can effectively create imperative components, and can still be used declaratively.