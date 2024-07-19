import React from 'react'
import ReactDOM from 'react-dom/client'
import { OverlayProvider } from '@overlastic/react'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OverlayProvider>
      <App />
    </OverlayProvider>
  </React.StrictMode>,
)
