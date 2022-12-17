import axios from 'axios';

export const getAuthHeaders = () => ({
  'Access-Token': `${localStorage.getItem('token')}`,
  'Access-Control-Allow-Origin': '*', // temp
});

const getDefHeaders = () => ({
  'Content-Type': 'application/json',
  ...getAuthHeaders(),
});

export const wrapRequest = options =>
  axios({
    headers: getDefHeaders(),
    ...options,
    url: options.url,
  }).catch(error => console.error(error));
