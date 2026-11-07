import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useEffect } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { useDisclosure, useOverlay } from '../composable'
import { OverlaysProvider } from './Provider'

function InnerDialog() {
  const { cancel } = useDisclosure({ duration: 0 })
  return <div role="dialog" aria-label="inner"><button onClick={() => cancel()}>Close inner</button></div>
}

function OuterDialog() {
  const { cancel } = useDisclosure({ duration: 0 })
  const openInner = useOverlay(InnerDialog)
  return (
    <div role="dialog" aria-label="outer">
      <button onClick={() => void openInner()}>Open inner</button>
      <button onClick={() => cancel()}>Close outer</button>
    </div>
  )
}

function OverlayHarness() {
  const openOuter = useOverlay(OuterDialog)
  useEffect(() => {
    void openOuter()
  }, [])
  return null
}

describe('overlaysProvider', () => {
  afterEach(cleanup)

  it('keeps the parent overlay open when the nested overlay closes', async () => {
    render(<OverlaysProvider><OverlayHarness /></OverlaysProvider>)
    fireEvent.click(await screen.findByRole('button', { name: 'Open inner' }))
    fireEvent.click(await screen.findByRole('button', { name: 'Close inner' }))

    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'inner' })).toBeNull())
    expect(screen.getByRole('dialog', { name: 'outer' })).toBeTruthy()
  })
})
