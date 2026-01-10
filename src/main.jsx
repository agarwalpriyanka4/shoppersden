import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import AppComponent from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store/store.jsx';
import {AuthProvider} from './components/molecules/AuthProvider/AuthProvider.jsx';
import { CartProvider } from './components/molecules/CartContext/CartContext.jsx'
createRoot(document.getElementById('ecommerce-root')).render(
  <StrictMode>
   <BrowserRouter>
   <AuthProvider>
   <Provider store={store}>
     <CartProvider>        {/* ✅ ADD THIS */}
        <AppComponent />
      </CartProvider>
    </Provider>
    </AuthProvider>
   </BrowserRouter> 
  </StrictMode>,
)