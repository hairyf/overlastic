# What is Unoverlay Vue?

Unoverlay Vue is the basic tool for making modals in Vue3 | Vue2 Composition-api, it can do many things, including but not limited to:

- Make [Message](https://element.eleme.cn/#/en-US/component/message) or [Dialog](https://element.eleme.cn/#/en-US/component/dialog) similar to `element-plus` / `naiveui` / `vuetifyjs` / `vant`...
- Supports two calling methods at the same time (template or js/ts)
- Integrate and customize functions using existing component libraries (such as element-plus)

## Technical background

In a large number of tedious business scenarios, I am often plagued by repeated Model class definition work, which means that once I encounter Model class components, I need to repeatedly define common fields such as `cancel`, `confirm`, `visible`, etc. ,
When I need to save the component state, I often need to control the Model process (`open model` -> `edit data` -> `@confirm` -> `save data`)
This greatly increases the workload and creates a lot of redundant code when components are reused.

From the Composition-api of Vue3 and the Model components on the market I got a lot of inspiration, Unoverlay Vue makes it very easy and powerful to define Model components,
It not only supports calling in Typescript and Javascript, when you want the template advantage of template, Model made with Unoverlay Vue can still do the job.
