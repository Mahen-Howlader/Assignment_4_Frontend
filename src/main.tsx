import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import router from './router/router'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" richColors   />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
