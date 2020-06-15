import { bookings, requestOptions } from '../api';
import _ from 'lodash';
import { handleError } from './handleError';


const create = async booking => {
  return await bookings.post('/create', booking, requestOptions)
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const getBookingsByDate = async (service, date) => {
  return await bookings.get(`/${service}/date/${date}`, requestOptions)
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const getBookingsByMonth = async (service, date) => {
  return await bookings.get(`/${service}/month/${date}`, requestOptions)
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const getBookingsByAuthor = async (service, userId) => {
  return await bookings.get(`/${service}/user/${userId}`, requestOptions)
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const patchBooking = async booking => {
  const { _id } = booking;
  const modyfiedBooking = _.omit(booking, ['_id', 'id', 'date']);
  return await bookings.patch(`/${_id}`, modyfiedBooking, requestOptions)
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
