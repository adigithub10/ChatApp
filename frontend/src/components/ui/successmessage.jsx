import React from 'react';
import './styles.css';

export function SuccessMessage({ isVisible }) {
  return isVisible ? (
    <div className="success-message">
      <p>Login Successful!</p>
    </div>
  ) : null;
}
