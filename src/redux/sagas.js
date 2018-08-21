import { all, fork } from 'redux-saga/effects';
import { drizzleSagas } from 'drizzle';

console.log(drizzleSagas);
export default function* root() {
  yield all(drizzleSagas.map(saga => fork(saga)));
}
