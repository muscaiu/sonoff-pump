import { apiDefaultAction } from 'middleware/apiDefaultAction';

export function fetchTemperature() {
  return apiDefaultAction({
    url: "/temperature",
    label: 'FETCHING_TEMPERATURE',
    onSuccess: data => ({
      type: 'TEMPERATURE_SET',
      payload: data
    }),
    onFailure: () => { console.log("Error occured loading temperature") },
  });
}
