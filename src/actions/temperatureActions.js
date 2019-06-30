import { apiDefaultAction } from 'middleware/apiDefaultAction';

export function fetchTemperatureList() {
  return apiDefaultAction({
    url: "/temperature/list",
    label: 'FETCHING_TEMPERATURE_LIST',
    onSuccess: data => ({
      type: 'TEMPERATURE_LIST_SET',
      payload: data
    }),
    onFailure: () => { console.log("Error occured loading temperature list") },
  });
}
