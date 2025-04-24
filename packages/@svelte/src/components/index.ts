/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// @ts-nocheck

import { delay } from '@overlastic/core'
import { getContext, onMount } from 'svelte'

let __defProp = Object.defineProperty
let __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value
let __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== 'symbol' ? `${key}` : key, value)

function noop() {
}
function assign(tar, src) {
  for (const k in src) tar[k] = src[k]
  return (
    /** @type {T & S} */
    tar
  )
}
function run(fn) {
  return fn()
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null)
}
function run_all(fns) {
  fns.forEach(run)
}
function is_function(thing) {
  return typeof thing === 'function'
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function'
}
function is_empty(obj) {
  return Object.keys(obj).length === 0
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn)
    return definition[0](slot_ctx)
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn)
    ;
  return $$scope.dirty
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn)
    slot.p(slot_context, slot_changes)
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = []
    const length = $$scope.ctx.length / 32
    for (let i = 0; i < length; i++) {
      dirty[i] = -1
    }
    return dirty
  }
  return -1
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null)
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node)
  }
}
function text(data) {
  return document.createTextNode(data)
}
function empty() {
  return text('')
}
function children(element) {
  return Array.from(element.childNodes)
}
let current_component
function set_current_component(component) {
  current_component = component
}
const dirty_components = []
const binding_callbacks = []
let render_callbacks = []
const flush_callbacks = []
const resolved_promise = /* @__PURE__ */ Promise.resolve()
let update_scheduled = false
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true
    resolved_promise.then(flush)
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn)
}
const seen_callbacks = /* @__PURE__ */ new Set()
let flushidx = 0
function flush() {
  if (flushidx !== 0) {
    return
  }
  const saved_component = current_component
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx]
        flushidx++
        set_current_component(component)
        update(component.$$)
      }
    }
    catch (e) {
      dirty_components.length = 0
      flushidx = 0
      throw e
    }
    set_current_component(null)
    dirty_components.length = 0
    flushidx = 0
    while (binding_callbacks.length) binding_callbacks.pop()()
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i]
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback)
        callback()
      }
    }
    render_callbacks.length = 0
  } while (dirty_components.length)
  while (flush_callbacks.length) {
    flush_callbacks.pop()()
  }
  update_scheduled = false
  seen_callbacks.clear()
  set_current_component(saved_component)
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update()
    run_all($$.before_update)
    const dirty = $$.dirty
    $$.dirty = [-1]
    $$.fragment && $$.fragment.p($$.ctx, dirty)
    $$.after_update.forEach(add_render_callback)
  }
}
function flush_render_callbacks(fns) {
  const filtered = []
  const targets = []
  render_callbacks.forEach(c => !fns.includes(c) ? filtered.push(c) : targets.push(c))
  targets.forEach(c => c())
  render_callbacks = filtered
}
const outroing = /* @__PURE__ */ new Set()
let outros
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros,
    // parent group
  }
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c)
  }
  outros = outros.p
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block)
    block.i(local)
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return
    outroing.add(block)
    outros.c.push(() => {
      outroing.delete(block)
      if (callback) {
        if (detach2)
          block.d(1)
        callback()
      }
    })
    block.o(local)
  }
  else if (callback) {
    callback()
  }
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$
  fragment && fragment.m(target, anchor)
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function)
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy)
    }
    else {
      run_all(new_on_destroy)
    }
    component.$$.on_mount = []
  })
  after_update.forEach(add_render_callback)
}
function destroy_component(component, detaching) {
  const $$ = component.$$
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update)
    run_all($$.on_destroy)
    $$.fragment && $$.fragment.d(detaching)
    $$.on_destroy = $$.fragment = null
    $$.ctx = []
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component)
    schedule_update()
    component.$$.dirty.fill(0)
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles = null, dirty = [-1]) {
  const parent_component = current_component
  set_current_component(component)
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root,
  }
  append_styles && append_styles($$.root)
  let ready = false
  $$.ctx = instance2
    ? instance2(component, options.props || {}, (i, ret, ...rest) => {
        const value = rest.length ? rest[0] : ret
        if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
          if (!$$.skip_bound && $$.bound[i])
            $$.bound[i](value)
          if (ready)
            make_dirty(component, i)
        }
        return ret
      })
    : []
  $$.update()
  ready = true
  run_all($$.before_update)
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target)
      $$.fragment && $$.fragment.l(nodes)
      nodes.forEach(detach)
    }
    else {
      $$.fragment && $$.fragment.c()
    }
    if (options.intro)
      transition_in(component.$$.fragment)
    mount_component(component, options.target, options.anchor)
    flush()
  }
  set_current_component(parent_component)
}
class SvelteComponent {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, '$$')
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, '$$set')
  }

  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1)
    this.$destroy = noop
  }

  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = [])
    callbacks.push(callback)
    return () => {
      const index = callbacks.indexOf(callback)
      if (index !== -1)
        callbacks.splice(index, 1)
    }
  }

  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true
      this.$$set(props)
      this.$$.skip_bound = false
    }
  }
}
const PUBLIC_VERSION = '4'
if (typeof window !== 'undefined')
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION)
const injectOverlayKey = Symbol('overlays:svelte')
const injectOptionsKey = Symbol('overlays:options')
function create_if_block(ctx) {
  let current
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
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor)
      }
      current = true
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty /* $$scope */
          & 2)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /* $$scope */
            ctx2[1],
            !current ? get_all_dirty_from_scope(
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
    i(local) {
      if (current)
        return
      transition_in(default_slot, local)
      current = true
    },
    o(local) {
      transition_out(default_slot, local)
      current = false
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching)
    },
  }
}
function create_fragment(ctx) {
  let if_block_anchor: Text
  let current
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
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor)
      insert(target, if_block_anchor, anchor)
      current = true
    },
    p(ctx2, [dirty]) {
      if (
        /* visible */
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty)
          if (dirty /* visible */
            & 1) {
            transition_in(if_block, 1)
          }
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
    i(local) {
      if (current)
        return
      transition_in(if_block)
      current = true
    },
    o(local) {
      transition_out(if_block)
      current = false
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor)
      }
      if (if_block)
        if_block.d(detaching)
    },
  }
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props
  let { visible = false } = $$props
  const { duration = 0 } = getContext(injectOptionsKey) || {}
  const { deferred, vanish } = getContext(injectOverlayKey)
  deferred == null
    ? void 0
    : deferred.finally(async () => {
        $$invalidate(0, visible = false)
        await delay(duration)
        vanish()
      })
  onMount(() => $$invalidate(0, visible = true))
  $$self.$$set = ($$props2) => {
    if ('visible' in $$props2)
      $$invalidate(0, visible = $$props2.visible)
    if ('$$scope' in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope)
  }
  return [visible, $$scope, slots]
}
class _Overlay extends SvelteComponent {
  constructor(options) {
    super()
    init(this, options, instance, create_fragment, safe_not_equal, { visible: 0 })
  }
}

const Overlay: any = _Overlay
export { Overlay  }
