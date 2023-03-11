# What is Unoverlays?

Unoverlays is the basic tool for making modals in Vue3 | Vue2 Composition-api, it can do many things, including but not limited to:

- Make [Message](https://element.eleme.cn/#/en-US/component/message) or [Dialog](https://element.eleme.cn/#/en-US/component/dialog) similar to `element-plus` / `naiveui` / `vuetifyjs` / `vant`...
- Supports two calling methods at the same time (template or js/ts)
- Integrate and customize functions using existing component libraries (such as element-plus)

## Technical background


In today's increasingly complex business scenarios, we are often troubled by the repeated definition of the model class, which means that once we encounter the model class components, we need to repeatedly define the common fields such as' cancel ',' confirm ', and' visible ',
When saving component status, it is often necessary to control the model process (` open model '->' edit data '->' @ confirm '->' save data ')
This greatly increases the workload and generates a large amount of redundant code when components are reused.

From the Composition-api of Vue3 and the current model components, I got a lot of inspiration. Unoverlays makes it very easy and powerful to define model components,
It not only supports calls in Typescript and Javascript, but also models made with Unoverlays are still competent when template rendering is required.
