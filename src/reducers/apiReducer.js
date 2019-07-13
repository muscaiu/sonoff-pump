export default function apiReducer(state = {}, action) {
  switch (action.type) {
    case 'API_START':
      if (action.payload === 'FETCHING_MODE' ||
        action.payload === 'FETCHING_STATUS' ||
        action.payload === 'FETCHING_STATUS_LIST' ||
        action.payload === 'FETCHING_TEMPERATURE_LIST'
      ) {
        return {
          ...state,
          isLoadingData: true
        };
      }
      break;
    case 'API_END':
      if (action.payload === 'FETCHING_MODE' ||
      action.payload === 'FETCHING_STATUS' ||
      action.payload === 'FETCHING_STATUS_LIST' ||
      action.payload === 'FETCHING_TEMPERATURE_LIST'
      ) {
        let allFinished = state.fetched || [];
        allFinished.push(action.payload)
        if (state.fetched && state.fetched.length >= 4) {
          return {
            ...state,
            isLoadingData: false
          };
        }
        return {
          ...state,
          fetched: allFinished
        };
      }
      break;
    case 'API_ERROR':
      return {
        ...state,
        isLoadingData: false
      };
    default:
      return state;
  }
}
