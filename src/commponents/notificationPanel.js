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
      className="position-absolute end-0 mt-2 me-3 bg-white text-dark shadow rounded p-3"
      style={{ width: "300px", zIndex: 999 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong>Notifications</strong>
        <button className="btn btn-sm btn-close" onClick={onClose}></button>
      </div>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {notifications.length > 0 ? (
          notifications.map((note, idx) => (
            <div
              key={idx}
              className="border-bottom pb-2 mb-2"
              style={{ cursor: "pointer", opacity: note.seen ? 0.5 : 1 }}
              onClick={() => markAsSeen(idx)}
            >
              <p className="mb-1">{note.message}</p>
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
