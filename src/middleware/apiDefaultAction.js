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
      url: `http://192.168.1.10:3001/api${url}`,
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
