import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducerList';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: [
  //   'userReducer',
  // ],
  blacklist: [
    'userReducer',
    'bookReducer',
  ],
};

// Middleware
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk),
);
// Middleware: Redux Persist Persister
const persistor = persistStore(store);

export {
  store,
  persistor,
};
