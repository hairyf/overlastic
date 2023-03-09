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

export const noop: Function = () => {}
