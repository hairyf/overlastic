import Vue from 'vue'

export const context = {
  parent: Vue as unknown as Vue,
}
export const OverlayMetaKey = Symbol('__imperative_overlay_key')
