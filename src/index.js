import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
let persistor = persistStore(store)

  

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App authorized={true} />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
