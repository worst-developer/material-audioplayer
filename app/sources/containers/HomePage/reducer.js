import * as Constants from './constants';

const initialState = {
  songs: [{
    audio_url: '',
    author: '',
    title: '',
    audio_length: ''
  }],
  isFetching: false
};

export default function audioReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.AUDIO_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case Constants.AUDIO_SUCCESS:
      return {
        ...state,
        songs: action.audio.data,
        isFetching: false
      }
    case Constants.AUDIO_FAIL: 
      return {
        ...state, 
        songs: action.response.error,
        isFetching: false
      }
    default:
      return state;
  }
}
