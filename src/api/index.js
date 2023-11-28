import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
const version = process.env.REACT_APP_API_VERSION || 'v1';
const apiURL = `${apiBaseUrl}/api/${version}`;
export const bookings = axios.create({
  baseURL: `${apiURL}/bookings`,
});

export const users = axios.create({
  baseURL: `${apiURL}/users`,
});

export const services = axios.create({
  baseURL: `${apiURL}/services`,
});

export const residences = axios.create({
  baseURL: `${apiURL}/residences`,
});

export const apartments = axios.create({
  baseURL: `${apiURL}/apartments`,
});

export const requestOptions = () => {
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.accessToken : process.env.REACT_APP_ACCESS_TOKEN_SECRET;
  console.log('process.env.REACT_APP_ACCESS_TOKEN_SECRET', process.env.REACT_APP_ACCESS_TOKEN_SECRET);
  const headers = {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`,
  };
  return { headers };
};