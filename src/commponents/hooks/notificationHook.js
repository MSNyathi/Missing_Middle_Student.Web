import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useNotification = () => {
     const API_URL = process.env.REACT_APP_API_URL;
     const [started, setStarted] = useState(false);
  const [connection, setConnection] = useState(new signalR.HubConnectionBuilder()
      .withUrl(`${API_URL}device/notification/hub`, { withCredentials: true})
      .configureLogging(signalR.LogLevel.Information)
      .build() );

  useEffect(() => {

   
    const start = async () => {
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    try {
      await connection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.error("Connection failed: ", err);
      setTimeout(start, 5000);
    }
  } else {
    console.warn("Cannot start SignalR connection. Current state:", connection.state);
  }
};

    connection.onclose(async () => {
      await start();
    });

    start();

    // Optional: cleanup when component unmounts
    return () => {
      connection.stop();
    };
  }, []);

  const notify = (message) => {
    alert(message);
  };

  return { connection, notify };
};

export default useNotification;
