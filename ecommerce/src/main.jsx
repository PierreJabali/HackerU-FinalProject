import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Make sure to import Router
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router> 
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
