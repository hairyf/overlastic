import { allowed } from './utils'

export type ImperativePromiser<T = void> = Promiser<{ resolve: (value: T) => ImperativePromise<T>; reject: Function }, T>
export type ImperativePromise<T = void> = ImperativePromiser<T>['promise']

export interface Promiser<P = object, T = void> {
  promise: Promise<T> & P
  resolve: (value: T) => void
  reject: Function
}

export function createPromiser<P, T = void>(): Promiser<P, T> {
  let resolve: any, reject: any

  const promise = new Promise<any>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as unknown as any

  return { promise, reject, resolve }
}

export function createImperativePromiser<T = void>() {
  const promiser = createPromiser<{ resolve: Function; reject: Function }, T>()
  promiser.promise.resolve = allowed
  promiser.promise.reject = allowed
  return promiser as ImperativePromiser<T>
}
