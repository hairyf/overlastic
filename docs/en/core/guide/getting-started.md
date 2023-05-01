# What is overlays?

overlays is a unified plugin for building overlays. It allows for the creation of callback (imperative) methods and the use of Template/JSX (declarative) in Vue Template or React Jsx.

###### Features

- Create Message or Dialog similar to `element-plus/antd...` Supports both callback (imperative) and Template/JSX (declarative) methods.
- Integration and customization of existing component libraries, such as `element-plus` and `antd`.
- Supports component inheritance of global application context.
- Supports frontend progressive frameworks such as `vue2|3` and `react`.

## Packages

- [@overlays/vue](/en/vue/) - Use Unified Overlays to create overlays in Vue app.
- [@overlays/react](/en/react/) - Use Unified Overlays to create overlays in React app.

## Devtools

Components created by Unified Overlays support Devtools for their corresponding frameworks (React, Vue).

###### Supported

| React Developer Tools | Vue.js Devtools                 |
| --------------------- | ------------------------------- |
| ✅<sup>(holder)</sup>  | ✅<sup>(holder\|child-app)</sup> |

- `holder` inserts a holder into the corresponding component, making it available in the virtual DOM.
- `child-app` creates a separate application that can be recognized by devtools.

## Why?

In today's increasingly complex business scenarios, we are often troubled by the repetitive work of defining Model classes. This means that once we encounter a Model class component, we need to repeatedly define common fields such as reject, resolve, and visible. When saving component state, we often need to control the Model process (`open model` -> `edit data` -> `onResolve` -> `save data`). This greatly increases the workload and produces a lot of redundant code when components are reused.

Therefore, it is necessary to commandize Modal (using a callback approach). Unified Overlays unifies the redundant processes and state management, and the use of Unified Overlays to create components remains effective when declaratively used (in Vue Template or React Jsx).