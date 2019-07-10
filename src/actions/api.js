export const apiStart = label => {
  return ({
    type: 'API_START',
    payload: label
  })
}

export const apiEnd = label => {
  return ({
    type: 'API_END',
    payload: label
  })
}

export const accessDenied = url => ({
  type: 'ACCESS_DENIED',
  payload: {
    url
  }
});

export const apiError = error => ({
  type: 'API_ERROR',
  error
});
