function temperarureReducer(state = {}, action) {
  switch (action.type) {
    case 'TEMPERATURE_LIST_SET':
      return {
        ...state,
        temperatureList: action.payload
      }
    default:
      return state
  }
}

export default temperarureReducer;
