import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store ,persistor} from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.jsx'
import { ThemeInit } from "../.flowbite-react/init";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistGate  persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
        <ThemeProvider>  
          <ThemeInit />
          <App />
        </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </StrictMode>,
)
