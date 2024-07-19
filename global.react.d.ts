declare module 'react' {
  interface HTMLAttributes<T> {
    class?: string | string[]
    className?: string
  }
  interface SVGProps<T> {
    'class'?: string | string[]
    'xml:space'?: string
  }

  export type PropsWithChildren<P = unknown> = P & { children?: ReactNode | undefined }

  export const useState: any
}

declare module '@vue/runtime' {
  export interface HTMLAttributes {
    className?: any
  }
}

declare module 'react/jsx-runtime'
