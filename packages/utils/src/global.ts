export const UnifiedOverlayProviderID = 'unified-overlay'

export function defineGlobalNode(id = '', root: HTMLElement = document.body) {
  const el = document.createElement('div')

  if (id)
    el.id = id

  root.appendChild(el)

  return el
}
