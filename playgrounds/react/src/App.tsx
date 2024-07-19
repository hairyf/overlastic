import { useState } from 'react'
import { useOverlay } from '@overlastic/react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Basic from './components/dBasic'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const openOverlay = useOverlay(Basic)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is
          {' '}
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs" onClick={openOverlay}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
