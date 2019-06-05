function modeReducer(state = {}, action) {
  switch (action.type) {
    case 'MODE_SET':
      return {
        ...state,
        mode: action.payload.value
      }
    case 'MODE_TOGGLE':
      return {
        ...state,
        mode: action.payload.value
      }
    default:
      return state
  }
}

export default modeReducer;
