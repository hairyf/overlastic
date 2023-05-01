# Component devtools

React components rendered with `defineOverlay | renderOverlay` cannot inherit the context normally, but you can use [useInjectHolder](/zh/react/advanced/holder) to create a pop-up layer inside the component and inherit the current context of the application.
