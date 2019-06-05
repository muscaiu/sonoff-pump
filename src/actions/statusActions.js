import { apiDefaultAction } from 'middleware/apiDefaultAction';

export function fetchInitialStatus() {
  return apiDefaultAction({
    url: "http://localhost:3001/api/status",
    onSuccess: setInitialStatus,
    onFailure: () => { console.log("Error occured loading status") },
    label: 'FETCHING_STATUS'
  });
}

function setInitialStatus(data) {
  return {
    type: 'STATUS_SET',
    payload: data
  };
}
