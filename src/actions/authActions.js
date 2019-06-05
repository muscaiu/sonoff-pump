// import axios from 'axios'

//TODO: make it modular
export const login = (credentials, option, showNotification) => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/users/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
    })
      .then(res => res.json())
      .then(res => {
        if (res === true) {
          if (typeof option === 'string') {
            fetch('http://localhost:3001/api/mode/create', {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                value: option === 'manual' ? 'auto' : 'manual'
              }),
            })
              .then(data => data.json())
              .then(data => {
                showNotification(
                  'bc',
                  'success',
                  `Success, Mode ${data.value === 'manual' ? 'Auto' : 'Manual'}`,
                );
                return dispatch({
                  type: 'MODE_TOGGLE',
                  mode: data.value
                })
              });
          }
          if (typeof option === 'boolean') {
            fetch('http://localhost:3001/api/status/create', {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                value: !option
              }),
            })
              .then(data => data.json())
              .then(data => {
                if (option) {
                  showNotification('bc', 'success', 'Success, Status OFF');
                } else {
                  showNotification('bc', 'success', 'Success, Status ON');
                }
                return dispatch({
                  type: 'STATUS_TOGGLE',
                  data
                })
              });
          }
        }
      })
      .catch(err => {
        console.log('login error', err);
        showNotification('bc', 'danger', `Wrong password!`);
      });
  };
};
