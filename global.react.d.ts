
declare module 'react' {
  interface HTMLAttributes<T> {
    class?: string | string[]
  }
  interface SVGProps<T> {
    // extends React's SVGProps
    class?: string | string[]
    'xml:space'?: string
  }
}