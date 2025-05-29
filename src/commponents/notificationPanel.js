"use client";

import React from "react";
import { motion } from "framer-motion";

const NotificationPanel = ({ notifications, onClose, markAsSeen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="position-absolute end-0 top-0 mt-5 me-4 bg-white text-dark shadow-lg rounded-4 p-4"
      style={{
        width: "350px",
        height: "80vh",
        zIndex: 9999,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">🔔 Notifications</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>

      <div
        style={{
          overflowY: "auto",
          flexGrow: 1,
          paddingRight: "5px",
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((note, idx) => (
            <div
              key={idx}
              className="mb-3 p-2 rounded bg-light"
              style={{
                cursor: "pointer",
                opacity: note.seen ? 0.6 : 1,
                borderLeft: note.seen ? "4px solid #ccc" : "4px solid #007bff",
              }}
              onClick={() => markAsSeen(idx)}
            >
              <div className="fw-medium">{note.message}</div>
              <small className="text-muted">{note.date || "Just now"}</small>
            </div>
          ))
        ) : (
          <p className="text-muted">No new notifications.</p>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationPanel;
