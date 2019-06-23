function statusReducer(state = {}, action) {
  switch (action.type) {
    case 'STATUS_GET':
      console.log(action.payload)
      return {
        ...state,
        status: action.payload.status.value,
        lastAction: action.payload.status.createdAt,
        temperature: action.payload.temperature,
      }
    case 'STATUS_LIST_SET':
      return {
        ...state,
        statusList: action.payload
      }
    case 'STATUS_TOGGLE':
      return {
        ...state,
        status: action.payload.value,
        lastAction: action.payload.createdAt
      }
    default:
      return state
  }
}

export default statusReducer;
