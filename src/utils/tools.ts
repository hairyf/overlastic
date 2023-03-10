export function delay(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function noop() {}

export function allowed() {
  throw new Error('overlay - Error: It is not allowed to call confirm and cancel externally immediately, please wait for the component to render')
}

