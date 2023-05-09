import jwt from 'jwt-decode';

const checkAuth = (userId) => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (userId && token) {
    const decoded = jwt(token);
    if (Date.now() / 1000 < decoded.exp) {
      return decoded.id === userId;
    } //else {refresh token}
  }
  return false;
};

export default checkAuth;
