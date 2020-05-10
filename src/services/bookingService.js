import { bookings } from '../api';
import _ from 'lodash';

const handleError = err => {
  if (err.response) {
    const { data } = err.response;
    const response = data.message ? data.message : 'Unknown error';
    return Promise.reject(response);
  } else if (err.request) {
    console.log('err.request', err.request.responseText)
    return Promise.reject('request error');
  } else if (err.message) {
    console.log('err.message', err.message)
    return Promise.reject(err.message);
  } else {
    console.log('err', err)
    return Promise.reject('unknown error');
  }
}


const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

const create = async booking => {
  return await bookings.post('/bookings/create', booking, requestOptions)
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const getBookingsByDate = async date => {
  return await bookings.get(`/bookings/date/${date}`, requestOptions)
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const getBookingsByMonth = async date => {
  return await bookings.get(`/bookings/month/${date}`, requestOptions)
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const getBookingsByAuthor = async userId => {
  return await bookings.get(`/bookings?timeslots.userId=${userId}`, requestOptions)
    .then(booking => {
      return Promise.resolve(booking);
    })
    .catch(err => handleError(err))
}

const patchBooking = async booking => {
  const { _id } = booking;
  const modyfiedBooking = _.omit(booking, ['_id', 'id', 'date']);
  return await bookings.patch(`/bookings/${_id}`, modyfiedBooking)
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
