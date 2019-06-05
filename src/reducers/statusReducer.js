function statusReducer(state = {}, action) {
  switch (action.type) {
    case 'STATUS_SET':
      return {
        ...state,
        status: action.payload.value,
        lastAction: action.payload.createdAt
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
