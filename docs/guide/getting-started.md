# Overlastic

Overlastic provides a standard process for creating messages or dialogs and defining your UI as a Promise, supporting usage across different frameworks.

###### Features

- 💫 Simplify the creation of pop-up components and define your UI as a promise
- 🧩 Integrate with existing components or component libraries
- 🦾 TypeScript support for secure type hints
- ➿ Support for component inheritance with context

## Packages

- [@overlastic/react](/react/)
- [@overlastic/vue](/vue/)
- [@overlastic/vanilla](/element/)
- [@overlastic/svelte](/svelte/)
- [@overlastic/core](/functions/constructor.html)

## Devtools

Unified Overlays support Devtools for different frameworks (React, Vue)

###### Supported

| React Developer Tools | Vue.js Devtools                  |
| --------------------- | -------------------------------- |
| ✅<sup>(holder)</sup> | ✅<sup>(holder\|child-app)</sup> |

## Why?

Creating pop-up components is a repetitive and time-consuming task. Each time you reuse such components, you need to redefine common fields like cancel, confirm, and visible. Additionally, controlling this process (`clear data`->`open Model`->`edit data`->`onConfirm`->`save data`) can lead to a lot of redundant code, especially for some global components.

Overlastic simplifies the creation of pop-up components by reducing redundant processes and managing the corresponding state. It effectively creates imperative components while also supporting declarative usage.
