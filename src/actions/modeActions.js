import { apiDefaultAction } from 'middleware/apiDefaultAction';

export function fetchInitialMode() {
  return apiDefaultAction({
    url: "/mode",
    label: 'FETCHING_MODE',
    onSuccess: data => {
      return ({
        type: 'MODE_GET',
        payload: data
      })
    },
    onFailure: () => { console.log("Error occured loading mode") },
  });
}

export function toggleMode(option, showNotification) {
  return apiDefaultAction({
    url: "/mode/create",
    method: 'POST',
    data: {
      value: option === 'manual' ? 'auto' : 'manual'
    },
    onSuccess: data => {
      showNotification(
        'bc',
        'success',
        `Success, Mode ${data.value === 'auto' ? 'Auto' : 'Manual'}`,
      );
      return {
        type: 'MODE_TOGGLE',
        payload: data
      }
    },
    onFailure: () => { console.log("Error occured loading status") },
  });
}
