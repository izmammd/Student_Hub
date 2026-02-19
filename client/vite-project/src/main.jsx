import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserWrapper } from './Component/Context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserWrapper>
      <App />
    </UserWrapper>  
  </StrictMode>
)
