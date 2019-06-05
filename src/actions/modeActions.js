import { apiDefaultAction } from 'middleware/apiDefaultAction';

export function fetchInitialMode() {
  return apiDefaultAction({
    url: "http://localhost:3001/api/mode",
    onSuccess: setInitialMode,
    onFailure: () => { console.log("Error occured loading mode") },
    label: 'FETCHING_MODE'
  });
}

function setInitialMode(data) {
  return {
    type: 'MODE_SET',
    payload: data
  };
}
