import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";
//import { StoreProvider } from './app/api/context/StoreContext';
//import { configureStore } from './app/store/configureStore';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';
//import { fetchProductsAsync } from './features/catalog/catalogSlice';

//const store = configureStore();
//We can get what is in the store with the getState method
//console.log(store.getState());

export const history = createBrowserHistory();

// This is for testing purposes
//store.dispatch(fetchProductsAsync());

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      {/*  This StoreProvider context gives access to this context through all the child App*/}
      {/* <StoreProvider> */}
        {/* With this Redux store provider we can get access to the store througn the whole application */}
        <Provider store={store}>
          <App />
        </Provider>
      {/* </StoreProvider> */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
