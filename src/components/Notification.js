// src/components/Notification.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message, type = "success") => {
  toast(message, { type });
};

const Notification = () => <ToastContainer />;

export default Notification;
