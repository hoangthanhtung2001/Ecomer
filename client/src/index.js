import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ToastContainer} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from'react-router-dom'
import { ContextProvider } from './components/context/store';
import { QueryClient,QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import DataProvider from './components/redux/store';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:false,
    }
  }
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <DataProvider>
      <ContextProvider> 
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer/>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right"></ReactQueryDevtools>
        </QueryClientProvider>
      </ContextProvider>
    </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
