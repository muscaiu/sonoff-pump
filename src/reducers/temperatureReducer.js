function temperatureReducer(state = {}, action) {
  switch (action.type) {
    case 'TEMPERATURE_SET':
      console.log(action.payload)
      return {
        ...state,
        temperature: action.payload.value,
      }
    case 'TEMPERATURE_LIST_SET':
      return {
        ...state,
        temperatureList: action.payload
      }
    default:
      return state
  }
}

export default temperatureReducer;
