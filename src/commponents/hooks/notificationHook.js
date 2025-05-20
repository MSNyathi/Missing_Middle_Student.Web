import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const useNotification = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [started, setStarted] = useState(false);

  const getStored = () => {
    const stored = localStorage.getItem("notifications");
    return stored ? JSON.parse(stored) : [];
  };

  const [notifications, setNotifications] = useState(getStored);

  const [connection, setConnection] = useState(
    new signalR.HubConnectionBuilder()
      .withUrl(`${API_URL}device/notification/hub`, { withCredentials: true })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build()
  );

  useEffect(() => {
    const start = async () => {
      if (connection.state === signalR.HubConnectionState.Disconnected) {
        try {
          await connection.start();
          console.log("✅ SignalR Connected.");
          setStarted(true);
        } catch (err) {
          console.error("❌ SignalR Connection failed: ", err);
          setTimeout(start, 5000);
        }
      } else {
        console.warn("SignalR already connecting or connected.");
      }
    };

    connection.on("newNotificaion", (incoming) => {
      console.log("📨 New notifications received:", incoming);

      const existing = getStored();

      // Merge new notifications with existing, preserving seen status
      const merged = incoming.map((note) => {
        const match = existing.find((n) => n.message === note.message && n.date === note.date);
        return match ? { ...note, seen: match.seen } : { ...note, seen: false };
      });

      setNotifications(merged);
      localStorage.setItem("notifications", JSON.stringify(merged));
    });

    connection.onclose(async () => {
      console.warn("⚠️ SignalR disconnected. Reconnecting...");
      await start();
    });

    start();

    return () => {
      connection.stop();
    };
  }, [connection]);

  const markAsSeen = (index) => {
    const updated = [...notifications];
    updated[index].seen = true;
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const clearNotifications = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return {
    connection,
     setNotifications,
    notify: (msg) => alert(msg),
    notifications,
    markAsSeen,
    clearNotifications,
  };
};

export default useNotification;
