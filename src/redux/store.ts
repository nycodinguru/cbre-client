import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { customersSlice } from 'redux/slices/customersSlice'
import { pageSlice } from 'redux/slices/pageSlice'

import rootSaga from 'redux/sagas/rootSaga';

let sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    customers: customersSlice.reducer,
    page: pageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);

export default store;
