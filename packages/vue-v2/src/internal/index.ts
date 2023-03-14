import type { Vue } from 'vue/types/vue'

export const context = {
  parent: null as null | Vue,
}
export const OverlayMetaKey = Symbol('__imperative_overlay_key')
