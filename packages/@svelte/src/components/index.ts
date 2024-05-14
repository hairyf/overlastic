/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable multiline-ternary */
import type { ComponentConstructorOptions } from 'svelte'
import { getContext, onMount } from 'svelte'
import { delay } from '@overlastic/core'
import {
  SvelteComponentTyped,
  check_outros,
  create_slot,
  detach,
  empty,
  get_all_dirty_from_scope,
  get_slot_changes,
  group_outros,
  init,
  insert,
  noop,
  safe_not_equal,
  transition_in,
  transition_out,
  update_slot_base,
} from 'svelte/internal'
import { injectOptionsKey, injectOverlayKey } from '../internal'
import type { ProgramsReturn } from '../types'
import type { ProgramsOptions } from '../composable'

function create_if_block(ctx: any[]) {
  let current: boolean

  const default_slot_template = (
    /* #slots */
    ctx[2].default
  )
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /* $$scope */
    ctx[1],
    null,
  )
  return {
    c() {
      if (default_slot)
        default_slot.c()
    },
    m(target: Node, anchor: Node) {
      if (default_slot)
        default_slot.m(target, anchor)

      current = true
    },
    p(ctx2: any[], dirty: number) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty /* $$scope */
        & 2)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /* $$scope */
            ctx2[1],
            !current
              ? get_all_dirty_from_scope(
              /* $$scope */
                ctx2[1],
              ) : get_slot_changes(
                default_slot_template,
                /* $$scope */
                ctx2[1],
                dirty,
                null,
              ),
            null,
          )
        }
      }
    },
    i(local?: 0 | 1) {
      if (current)
        return
      transition_in(default_slot, local)
      current = true
    },
    o(local: 0 | 1) {
      transition_out(default_slot, local)
      current = false
    },
    d(detaching: any) {
      if (default_slot)
        default_slot.d(detaching)
    },
  }
}
function create_fragment(ctx: any[]) {
  let if_block_anchor: Node | Text
  let current: boolean
  let if_block = (
    /* visible */
    ctx[0] && create_if_block(ctx)
  )
  return {
    c() {
      if (if_block)
        if_block.c()
      if_block_anchor = empty()
    },
    m(target: Node, anchor: Node) {
      if (if_block)
        if_block.m(target, anchor)
      insert(target, if_block_anchor, anchor)
      current = true
    },
    p(ctx2: any[], [dirty]: any) {
      if (/* visible */ ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty)
          if (dirty /* visible */ & 1)
            transition_in(if_block, 1)
        }
        else {
          if_block = create_if_block(ctx2)
          if_block.c()
          transition_in(if_block, 1)
          if_block.m(if_block_anchor.parentNode, if_block_anchor)
        }
      }
      else if (if_block) {
        group_outros()
        transition_out(if_block, 1, 1, () => {
          if_block = null
        })
        check_outros()
      }
    },
    i() {
      if (current)
        return
      transition_in(if_block)
      current = true
    },
    o() {
      // @ts-expect-error
      transition_out(if_block)
      current = false
    },
    d(detaching: any) {
      if (if_block)
        if_block.d(detaching)
      if (detaching)
        detach(if_block_anchor)
    },
  }
}

function instance($$self: any, $$props: any, $$invalidate: any) {
  let { $$slots: slots = {}, $$scope } = $$props
  let { visible = false } = $$props
  const { duration = 0, immediate = true } = getContext<ProgramsOptions>(injectOptionsKey) || {}
  const { deferred, vanish } = getContext<ProgramsReturn>(injectOverlayKey)

  // The component directly obtains the default value
  // vanish will have no effect, and no watch will be performed.
  async function destroy() {
    $$invalidate(0, visible = false)
    await delay(duration)
    vanish?.()
    return Promise.resolve()
  }
  onMount(() => immediate && $$invalidate(0, visible = true))
  deferred?.then(destroy).catch(destroy)

  $$self.$$set = ($$props2: any) => {
    if ('visible' in $$props2)
      $$invalidate(0, visible = $$props2.visible)
    if ('$$scope' in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope)
  }
  return [visible, $$scope, slots]
}

class Overlay extends SvelteComponentTyped<{ visible?: boolean }> {
  constructor(options: ComponentConstructorOptions) {
    super(options)
    init(this, options, instance, create_fragment, safe_not_equal, { visible: 0 }, noop)
  }
}

export { Overlay }
