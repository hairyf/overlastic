export function noop() {}

export function allowed() {
  throw new Error('overlay - Error: It is not allowed to call confirm and cancel externally immediately, please wait for the component to render')
}

export function delay(milliseconds?: number) {
  return new Promise(confirm => setTimeout(confirm, milliseconds))
}
