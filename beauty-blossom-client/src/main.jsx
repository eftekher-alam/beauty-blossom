// https://github.com/programming-hero-web-course-4/b8a10-brandshop-client-side-eftekher-alam

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import AuthProvider from './providers/auth_provider/AuthProvider'
import CartProvider from './providers/cart_provider/CartProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>,
)
