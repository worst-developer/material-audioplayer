import { fork } from 'redux-saga/effects';
import audioSaga from './containers/HomePage/sagas'

export default function* rootSaga() {
  yield fork(audioSaga)
}
