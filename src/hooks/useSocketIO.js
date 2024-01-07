import socket from '../utils/socket-io-client';
import { useState, useEffect } from "react";

const useSocketIO = () => {
  const [connected, setConnected] = useState(false);
  const [updatedBookings, setUpdatedBookings] = useState(null)

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("connect_error", (err) => {
      // console.error(`connect_error due to ${err.message}`);
      setConnected(false);
    });
  }, [connected, setConnected]);
  
  useEffect(() => {
    socket.on("booking_updates", data => {
      setUpdatedBookings(data);
    });
  }, [updatedBookings, setUpdatedBookings]);

  return { connected, updatedBookings };
};
export default useSocketIO;