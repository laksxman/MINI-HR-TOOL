import React from 'react'
import { gsap } from 'gsap'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

gsap.registerPlugin()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
