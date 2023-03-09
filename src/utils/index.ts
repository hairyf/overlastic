export function delay(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function createPromiser<P = Promise<any>>() {
  let resolve!: Function
  let reject!: Function
  const promise = new Promise<any>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as unknown as P
  return { promise, reject, resolve }
}

export function noop() {}

export function allowed() {
  throw new Error('overlay - Error: It is not allowed to call confirm and cancel externally immediately, please wait for the component to render')
}

let portalIndex = 1

export function createGlobalNode(id?: string, root: HTMLElement = document.body) {
  const el = document.createElement('div')

  el.id = `${id}--${portalIndex++}`

  root.appendChild(el)

  return el
}
