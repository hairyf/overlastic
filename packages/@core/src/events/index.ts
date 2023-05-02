import { context } from '../internal'

export function watchClickPosition() {
  if (typeof window === 'undefined' && typeof document === 'undefined')
    return
  document.addEventListener('click', (event) => {
    if (event.target instanceof Element) {
      const { left, top, width, height } = event.target.getBoundingClientRect()
      if (left > 0 || top > 0) {
        // impossible to be triggered by real click
        context.position = { x: left + width / 2, y: top + height / 2 }
      }
      else {
        context.position = null
      }
    }
    else {
      context.position = null
    }
    setTimeout(() => context.position = null, 64)
  })
}
