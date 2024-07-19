/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
  import { SvelteComponent } from 'svelte'

  export default SvelteComponent
}
