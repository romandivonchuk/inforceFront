import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app'
import { Provider } from 'react-redux'
import './index.css'
import store from './store/store';


ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    ,
  document.getElementById('root')
);