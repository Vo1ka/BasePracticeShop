import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import { createLogger } from 'redux-logger';
import {productsApi} from './slices/apiSlice';
import profileReducer from './slices/profileSlice';
import adminReducer from './slices/adminSlice';

const logger = createLogger({
  collapsed: true,
  duration: true
});


export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authReducer,
    theme: themeReducer,
    products: productsReducer,
    cart: cartReducer,
    profile: profileReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>{
    const middlewares = getDefaultMiddleware()
      .concat(productsApi.middleware); // Добавляем middleware RTK Query
    
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger); // Добавляем logger только в development
    }
    
    return middlewares;
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

