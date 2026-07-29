export const UnifiedOverlayProviderID = 'unified-overlay'

export function defineGlobalElement(id = '', root: HTMLElement | false | undefined = typeof document !== 'undefined' ? document.body : undefined) {
  if (typeof document === 'undefined')
    return undefined as any

  const el = document.createElement('div')

  if (id)
    el.id = id

  if (root)
    root.appendChild(el)

  return el
}
