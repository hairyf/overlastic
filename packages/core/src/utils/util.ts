export function noop() {}

export function allowed() {
  throw new Error('overlay - Error: It is not allowed to call resolve and reject externally immediately, please wait for the component to render')
}

export function delay(milliseconds?: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
