import React from 'react';

interface ToastNotificationProps {
  show: boolean;
  message: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ show, message }) => {
  return (
    <div 
      className={`toast ${show ? 'toast--show' : ''}`} 
      id="toast-notification"
    >
      {message}
    </div>
  );
};
