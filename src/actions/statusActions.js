import { apiDefaultAction } from 'middleware/apiDefaultAction';

export function fetchInitialStatus() {
  return apiDefaultAction({
    url: "http://localhost:3001/api/status",
    onSuccess: data => ({
      type: 'STATUS_SET',
      payload: data
    }),
    onFailure: () => { console.log("Error occured loading status") },
    label: 'FETCHING_STATUS',
  });
}

export function toggleStatus(option, showNotification) {
  return apiDefaultAction({
    url: "http://localhost:3001/api/status/create",
    method: 'POST',
    data: {
      value: !option
    },
    onSuccess: data => {
      if (option) {
        showNotification('bc', 'success', 'Success, Status OFF');
      } else {
        showNotification('bc', 'success', 'Success, Status ON');
      }
      return {
        type: 'STATUS_TOGGLE',
        payload: data
      }
    },
    onFailure: () => { console.log("Error occured loading status") },
  });
}
