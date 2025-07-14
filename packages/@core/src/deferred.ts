export type Deferred<T = void> = Promise<T> & {
  confirm: (value: T) => void
  cancel: (reason?: any) => void
  close: () => void
}

export function createDeferred<T = void>(): Deferred<T> {
  let confirm: any, cancel: any

  const promise = new Promise<any>((_confirm, _cancel) => {
    confirm = _confirm
    cancel = _cancel
  }) as unknown as any

  promise.confirm = (v: any) => {
    confirm(v)
    return promise
  }
  promise.close = () => {
    confirm()
  }
  promise.cancel = cancel

  return promise
}
