import axios from 'axios';

const env = process.env.NODE_ENV;
console.log('env', env);

export const bookings = axios.create({
  baseURL: env === 'development' ? 'http://localhost:3000' : 'https://calendar-bookings.herokuapp.com/'
});

export const users = axios.create({
  baseURL: env === 'development' ? 'http://localhost:3000/users' : 'https://calendar-bookings.herokuapp.com/users'
})