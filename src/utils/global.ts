let portalIndex = 1

export function createGlobalNode(id?: string, root: HTMLElement = document.body) {
  const el = document.createElement('div')

  el.id = `${id}--${portalIndex++}`

  root.appendChild(el)

  return el
}
