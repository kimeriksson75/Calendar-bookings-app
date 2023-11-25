import io from "socket.io-client";
const socket = io.connect('https://calendar-bookings-api-25317944a4a4.herokuapp.com');
export default socket;