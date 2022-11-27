import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'recados',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// captura dos tipos das entidades salvas na nossa store
export type RootState = ReturnType<typeof store.getState>;

// captura do tipo da função dispatch do toolkit - tipo de todas as actions disponiveis a partir dos nossos reducers
export type AppDispatch = typeof store.dispatch;

export default store;

