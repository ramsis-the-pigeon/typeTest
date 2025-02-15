import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { TestModeContextProvider } from './Context/TesModeContext.jsx'
import { ThemeContextProvider } from './Context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeContextProvider>
        <TestModeContextProvider>
            <App />
        </TestModeContextProvider>
    </ThemeContextProvider>
    
   
  
)
