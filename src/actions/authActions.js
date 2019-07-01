import { apiDefaultAction } from 'middleware/apiDefaultAction';
import { toggleStatus } from 'actions/statusActions';
import { toggleMode } from 'actions/modeActions';

export function login(credentials, option, showNotification) {
  console.log('credentials:', credentials)
  return apiDefaultAction({
    url: "/users/auth",
    method: 'POST',
    data: credentials,
    onSuccess: data => {
      if (data) { // if api returns true
        if (typeof option === 'string') {
          return toggleMode(option, showNotification);
        }
        return toggleStatus(option, showNotification);
      }
      return showNotification('bc', 'danger', `Wrong password!`)
    },
    onFailure: () => showNotification('bc', 'danger', `Something went wrong!`),
  });
}
