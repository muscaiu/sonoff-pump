import { combineReducers } from 'redux';
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase';
import modeReducer from 'reducers/modeReducer';
import statusReducer from 'reducers/statusReducer';
import temperatureReducer from 'reducers/temperatureReducer';
import apiReducer from 'reducers/apiReducer';

const rootReducer = combineReducers({
  // firestore: firestoreReducer,
  // firebase: firebaseReducer,
  mode: modeReducer,
  status: statusReducer,
  api: apiReducer,
  temperature: temperatureReducer,
});

export default rootReducer;
