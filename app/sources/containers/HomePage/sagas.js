import { call, put, takeEvery } from 'redux-saga/effects';
import { AUDIO_REQUEST,
         AUDIO_FAIL,
         AUDIO_SUCCESS
} from './constants';
import { httpGet } from '../../utils/FetchApi';

function* fetchAudios(action) {
   try {
     const audioData = yield call(httpGet, 'http://ec2-35-167-165-150.us-west-2.compute.amazonaws.com:5555/audio')
     yield put({ type: AUDIO_SUCCESS, audio: audioData.data });
   } catch (error) {
     yield put({ type: AUDIO_FAIL, response: error.response.data });
   }
}

export default function* audioSaga() {
  yield takeEvery(AUDIO_REQUEST, fetchAudios);
}
