import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";
import Popup from './popup'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-left" reverseOrder={false} />
    <Popup />
  </StrictMode>,
)
