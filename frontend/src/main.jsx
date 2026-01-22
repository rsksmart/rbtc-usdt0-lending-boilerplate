import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Web3AuthProvider } from './contexts/Web3AuthContext'
import { PrivyWalletProvider } from './contexts/PrivyWalletProvider'
import { ReownWalletProvider } from './contexts/ReownWalletProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReownWalletProvider>
      <PrivyWalletProvider>
        <Web3AuthProvider>
          <App />
        </Web3AuthProvider>
      </PrivyWalletProvider>
    </ReownWalletProvider>
  </StrictMode>,
)
