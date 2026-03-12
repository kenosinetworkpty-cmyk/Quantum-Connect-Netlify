import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App' // Does src/App.tsx exist?
import './src/index.css'   // Does src/index.css exist?

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)