import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_API_BASE_URL, {
    transports: ["websocket"],
    rejectUnauthorized: false
});
export default socket;