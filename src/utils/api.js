import axios from 'axios';
import { toast } from 'react-toastify';

export const getAuthHeaders = () => ({
  'x-access-token': JSON.parse(localStorage.getItem('token')),
  'Access-Control-Allow-Origin': '*', // temp
});

const getDefHeaders = () => ({
  'Content-Type': 'application/json',
  ...getAuthHeaders(),
});

export const wrapRequest = (options) =>
  axios({
    headers: getDefHeaders(),
    ...options,
    url: options.url,
  }).catch((err) =>
    toast.error(err, {
      position: toast.POSITION.TOP_RIGHT,
    }),
  );
