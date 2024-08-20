import React from 'react';
import './styles.css';

export function Button({ onClick, children }) {
  return (
    <button className="animated-button" onClick={onClick}>
      {children}
    </button>
  );
}
