import { apiDefaultAction } from 'middleware/apiDefaultAction';

export function fetchInitialStatus() {
  return apiDefaultAction({
    url: "/status",
    label: 'FETCHING_STATUS',
    onSuccess: data => ({
      type: 'STATUS_SET',
      payload: data
    }),
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

export function toggleStatus(option, showNotification) {
  return apiDefaultAction({
    url: "/status/create",
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
    onFailure: () => { console.log("Error occured toggling status") },
  });
}
