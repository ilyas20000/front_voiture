import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApiContext } from './context/ApiContext';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApiContext.Provider value="url">
      <App />
    </ApiContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
