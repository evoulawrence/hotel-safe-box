import { all } from 'redux-saga/effects';
import { watchSubmitCodeFlow, watchUnlockinBoxFLow, watchValidationMasercodeFlow } from './safeBox/sagas';
import { watchMakeScreenActiveFlow } from './common/sagas';

export default function* rootSaga() {
  yield all([
    watchSubmitCodeFlow(),
    watchUnlockinBoxFLow(),
    watchMakeScreenActiveFlow(),
    watchValidationMasercodeFlow(),
  ]);
}
