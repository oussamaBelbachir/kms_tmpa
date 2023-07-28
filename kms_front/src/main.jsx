import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


import { Provider } from 'react-redux';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
      <BrowserRouter>
        <Toaster 

              containerStyle={{
                padding :"200px"
              }}

              toastOptions={{

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },

              },
              style: {
                padding: '10px 28px',
              },
              }}
          />
      <App />
      </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)
