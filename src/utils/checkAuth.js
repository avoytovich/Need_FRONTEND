import jwt from 'jwt-decode';

const checkAuth = (userId) => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (userId && token) {
    const decoded = jwt(token);
    return decoded.id === userId;
  }
  return false;
};

export default checkAuth;
