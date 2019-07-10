// function allPassed(label) {
//   return new Promise((resolve, reject) => {
//     let total = false;
//     if (label === 'FETCHING_MODE') {
//       // total = true;
//     }
//     if (label === 'FETCHING_STATUS') {
//       // total = true;
//     }
//     console.log('total:', total)
//     if (total) {
//       resolve(total)
//     }else{
//       console.log(total)
//     }
//   })
// }

export default async function (state = {}, action) {
  switch (action.type) {
    case 'API_START':
      if (
        // action.payload === 'FETCHING_MODE' ||
        action.payload === 'FETCHING_STATUS'
        // action.payload === 'FETCHING_STATUS_LIST' ||
        // action.payload === 'FETCHING_TEMPERATURE_LIST'
      ) {
        return {
          ...state,
          isLoadingData: true
        };
      }
      break;
    case 'API_END':
      // const passed = await (allPassed(action.payload))
      // if (passed)
      if (action.payload === 'FETCHING_MODE' ||
        action.payload === 'FETCHING_STATUS' ||
        action.payload === 'FETCHING_STATUS_LIST' ||
        action.payload === 'FETCHING_TEMPERATURE_LIST'
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
