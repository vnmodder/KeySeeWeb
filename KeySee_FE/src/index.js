import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './container/App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { persistor, store } from 'src/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import InjectAxiosInterceptors from './routes/InjectAxiosInterceptors'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <InjectAxiosInterceptors />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
