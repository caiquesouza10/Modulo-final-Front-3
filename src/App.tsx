import React from 'react';
import { CssBaseline } from "@mui/material";
import AppRoutes from "./router/Router";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import minhaStore, { persistor } from './store';


function App(): JSX.Element {
  return (
    <>
      <Provider store={minhaStore}>
        <PersistGate persistor={persistor}>
          <CssBaseline />
          <AppRoutes />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
