import { combineReducers, createStore} from 'redux'
// import {loadState} from '../StateMgmt/localstore';
import {changeNumber, BrandsReducer, ProductsReducer, ApplicationLoader} from './AllReducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const rootReducer = combineReducers({
    
        changeNumber,BrandsReducer, ProductsReducer, ApplicationLoader
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['ProductsReducer']
  }
   
const persistedReducer = persistReducer(persistConfig, rootReducer)

//Check added to enable/disable redux  tool as per environment
export const persistedStore = createStore(persistedReducer, process.env.REACT_APP_STAG_ENV.toLowerCase() != 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : [])
export const persistor = persistStore(persistedStore)

    
//const persistedState = loadState();

// const appStore = createStore(rootreducer, persistedState,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//export default appStore;

