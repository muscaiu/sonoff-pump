import { apiDefaultAction } from 'middleware/apiDefaultAction';

export function fetchInitialTemperature() {
  return apiDefaultAction({
    url: "/status",
    label: 'FETCHING_STATUS',
    onSuccess: data => {
      return ({
        type: 'STATUS_GET',
        payload: data
      })
    },
    onFailure: () => { console.log("Error occured loading status") },
  });
}

export function fetchStatusList() {
  return apiDefaultAction({
    url: "/status/list",
    label: 'FETCHING_STATUS_LIST',
    onSuccess: data => ({
      type: 'STATUS_LIST_SET',
      payload: data
    }),
    onFailure: () => { console.log("Error occured loading status list") },
  });
}
