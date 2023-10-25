import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productReducer from './redux-toolkit/product.slide';
import filterReducer from './redux-toolkit/filter.slice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    filter: filterReducer
  }
});




// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// useAppDispatch dùng khi dispatch 1 async thunk, còn khi dispatch những action thông thường thì dùng AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
