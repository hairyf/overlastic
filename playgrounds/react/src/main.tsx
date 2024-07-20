import React from 'react'
import ReactDOM from 'react-dom/client'
import { OverlaysProvider } from '@overlastic/react'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OverlaysProvider>
      <App />
    </OverlaysProvider>
  </React.StrictMode>,
)
