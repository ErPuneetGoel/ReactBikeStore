import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "./index.css";
import App from "./App";
import { PersistGate } from 'redux-persist/integration/react'
import { persistedStore, persistor} from './ReduxModule/store';
import {Provider} from 'react-redux';
import LoaderSpinner from "./Components/Spinner";
//import {saveState} from './StateMgmt/localstore';
  
// appStore.subscribe(() => {
//   saveState({
//    /* example state */
//    changeNumber:appStore.getState().changeNumber,
//    BrandsReducer:appStore.getState().BrandsReducer,
//    ProductsReducer: appStore.getState().ProductsReducer
//   });
// });


ReactDOM.render(
  <Provider store={persistedStore}>
    <PersistGate loading={LoaderSpinner} persistor={persistor}>
  <BrowserRouter>  
     <App />    
  </BrowserRouter>
  </PersistGate>
  </Provider>,
  document.getElementById("root")
);
