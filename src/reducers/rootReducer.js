import { combineReducers } from 'redux';
import apiReducer from 'reducers/apiReducer';
import modeReducer from 'reducers/modeReducer';
import statusReducer from 'reducers/statusReducer';
import temperatureReducer from 'reducers/temperatureReducer';

const rootReducer = combineReducers({
  mode: modeReducer,
  status: statusReducer,
  temperature: temperatureReducer,
  api: apiReducer,
});

export default rootReducer;
