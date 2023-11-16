import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
const version = process.env.REACT_APP_API_VERSION || 'v1';
const apiURL = process.env.NODE_ENV === 'development' ? `${apiBaseUrl}/${version}` : `https://calendar-bookings.herokuapp.com/api/${version}`;
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('process.env.REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL)
console.log('process.env.REACT_APP_API_VERSION:', process.env.REACT_APP_API_VERSION)
console.log('apiURL:', apiURL)
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
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.accessToken : '0000000000';

  const headers = {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`,
  };
  return { headers };
};