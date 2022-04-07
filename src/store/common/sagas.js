import { put, takeEvery, delay } from 'redux-saga/effects';
import { ACTIVATE_SCREEN, SET_COMMON_PROP } from './consts';

export const getProject = (state) => state.box;

// Make screen active flow
function* makeScreenActiveFlow(action) {
  try {
    const pressedBox = yield action?.pressedBox;
    if (pressedBox === 'pressed') {
      yield put({ type: SET_COMMON_PROP, key: 'isActiveScreen', value: true });
      yield delay(5000);
      yield put({ type: SET_COMMON_PROP, key: 'isActiveScreen', value: false });
    } else {
      yield put({ type: SET_COMMON_PROP, key: 'isActiveScreen', value: false });
    }
  } catch (error) {
    console.log('error', error);
  }
}

export function* watchMakeScreenActiveFlow() {
  yield takeEvery(ACTIVATE_SCREEN, makeScreenActiveFlow);
}

export function* watchFollowBoxActionFlow() {
  
}
