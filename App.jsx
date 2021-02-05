import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RouterComponent from './src/router/RouterComponent';
import { store, persistor } from './src/store/configStore';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterComponent />
        </PersistGate>
      </Provider>
    </>
  );
}
