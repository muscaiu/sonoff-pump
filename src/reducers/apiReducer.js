export default function (state = {}, action) {
  // console.log(action)
  switch (action.type) {
    case 'API_START':
      if (
        action.payload === 'FETCHING_STATUS' ||
        action.payload === 'FETCHING_STATUS_LIST' ||
        action.payload === 'FETCHING_MODE'
      ) {
        return {
          ...state,
          isLoadingData: true
        };
      }
      break;
    case 'API_END':
      if (
        action.payload === 'FETCHING_STATUS' ||
        action.payload === 'FETCHING_STATUS_LIST' ||
        action.payload === 'FETCHING_MODE'
      ) {
        return {
          ...state,
          isLoadingData: false
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
