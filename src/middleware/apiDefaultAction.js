export function apiDefaultAction({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => { },
  onFailure = () => { },
  label = "",
  headersOverride = null
}) {
  return {
    type: 'API',
    payload: {
      // url: `http://cassusa.go.ro:3001/api${url}`,
      url: `http://localhost:3001/api${url}`,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride
    }
  };
}
