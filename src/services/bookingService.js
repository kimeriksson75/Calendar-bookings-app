import { bookings, requestOptions } from '../api';
import _ from 'lodash';
import { handleError } from './handleError';


const create = async (booking, userId) => {
  return await bookings.post(`/${userId}`, booking, requestOptions())
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const getBookingsByDate = async (service, date) => {
  return await bookings.get(`/service/${service}/date/${date}`, requestOptions())
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const getBookingsByMonth = async (service, date) => {
  return await bookings.get(`/service/${service}/month/${date}`, requestOptions())
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const getBookingsByAuthor = async (service, userId) => {
  return await bookings.get(`/service/${service}/user/${userId}`, requestOptions())
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const patchBooking = async (booking, userId) => {
  console.log('booking', booking);
  const { _id } = booking;
  const modyfiedBooking = _.omit(booking, ['_id', 'id']);
  return await bookings.patch(`/${userId}/${_id}`, modyfiedBooking, requestOptions())
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const bookingService = {
  create,
  getBookingsByDate,
  getBookingsByMonth,
  getBookingsByAuthor,
  patchBooking
};

export default bookingService;
