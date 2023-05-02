export const UnifiedOverlayProviderID = 'unified-overlay'

export function defineGlobalNode(id = '', root: HTMLElement | false = document.body) {
  const el = document.createElement('div')

  if (id)
    el.id = id

  if (root !== false)
    root.appendChild(el)

  return el
}
