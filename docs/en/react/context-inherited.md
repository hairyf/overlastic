# Component devtools

React components rendered with `createOverlay | renderOverlay` cannot inherit the context normally, but you can use [useInjectHolder](/zh/react/holder) to create a pop-up layer inside the component and inherit the current context of the application.
