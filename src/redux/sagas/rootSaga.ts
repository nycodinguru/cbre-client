import { all, call } from 'redux-saga/effects';

import customers from './customers'

const sagas = [...customers];

export default function* rootSaga() {
  yield all(sagas.map((saga) => call(saga)));
}
