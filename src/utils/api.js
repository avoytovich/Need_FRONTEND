import axios from 'axios';
import { toast } from 'react-toastify';

import { API } from 'helper/constants';

export const getAuthHeaders = () => ({
  'x-access-token': JSON.parse(localStorage.getItem('token')),
  'Access-Control-Allow-Origin': '*', // temp
});

const getDefHeaders = () => ({
  'Content-Type': 'application/json',
  ...getAuthHeaders(),
});

export const wrapRequest = (options) => {
  axios.interceptors.response.use(
    (resp) => {
      if (resp.response?.status === 401) {
        const payload = {
          refreshToken: JSON.parse(localStorage.getItem('refreshToken')),
          id: JSON.parse(localStorage.getItem('userId')),
        };
        return axios({
          method: 'POST',
          url: `${API.URL[process.env.NODE_ENV]}/token`,
          mode: 'cors',
          cache: 'default',
          data: payload,
        })
          .then((data) => {
            localStorage.setItem('token', JSON.stringify(data.data.token));
            localStorage.removeItem('refreshToken');
            return axios({
              ...resp.config,
              headers: {
                common: {
                  ['x-access-token']: data.data.token,
                },
              },
            });
          })
          .catch((err) => {
            localStorage.clear();
            location.reload();
            toast.error(err, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      } else {
        return resp;
      }
    },
    (error) => {
      return error;
    },
  );

  return axios({
    headers: getDefHeaders(),
    ...options,
    url: options.url,
  }).catch((err) =>
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    }),
  );
};
