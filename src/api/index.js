import axios from 'axios';

const env = process.env.NODE_ENV;

const token = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).data.token;

export const bookings = axios.create({
  baseURL: env === 'development' ? 'http://localhost:3000/bookings' : 'https://calendar-bookings.herokuapp.com/bookings',
});

export const users = axios.create({
  baseURL: env === 'development' ? 'http://localhost:3000/users' : 'https://calendar-bookings.herokuapp.com/users',
});

export const services = axios.create({
  baseURL: env === 'development' ? 'http://localhost:3000/services' : 'https://calendar-bookings.herokuapp.com/services',
});

export const requestOptions = {
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${token}`,
    'timeout': 5000
  },
};