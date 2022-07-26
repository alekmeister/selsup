import { configureStore } from '@reduxjs/toolkit';
import valuesReducer from './paramsAndValues/slice';

export const store = configureStore({
  reducer: {
    paramsAndValues: valuesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
