import { combineReducers } from 'redux';
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase';
import apiReducer from 'reducers/apiReducer';
import modeReducer from 'reducers/modeReducer';
import statusReducer from 'reducers/statusReducer';
import temperatureReducer from 'reducers/temperatureReducer';

const rootReducer = combineReducers({
  // firestore: firestoreReducer,
  // firebase: firebaseReducer,
  mode: modeReducer,
  status: statusReducer,
  temperature: temperatureReducer,
  api: apiReducer,
});

export default rootReducer;
