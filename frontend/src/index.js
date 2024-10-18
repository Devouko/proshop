import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import App from './App';
import store from './store.js';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Homescreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.jsx';


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';



// Create the router with defined routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Homescreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
    </Route>
  )
);

// Target the root element in the HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with Redux Provider and RouterProvider
root.render(
  <React.StrictMode>
    {/* Wrapping the application in the Redux provider to pass the store */}
    <Provider store={store}>
      {/* Wrapping the application in the RouterProvider for routing */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
