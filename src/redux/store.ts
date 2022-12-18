import { configureStore } from '@reduxjs/toolkit';
import { currentBodyRowsSlice } from './slices/currentBodyRows';


export const store = configureStore({
  reducer: {
    currentBodyRows: currentBodyRowsSlice.reducer,
  },
  devTools: true,
});
export const createStore = () => store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
