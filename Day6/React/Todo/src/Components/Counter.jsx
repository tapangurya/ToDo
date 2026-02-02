import React from 'react';

const Counter = ({ onCHange, stateValue, onDecrease }) => {
  return (
    <div>
      <h1>Welcome to Counter Application</h1>
      <h2>Current value: {stateValue}</h2>
      <button onClick={() => onCHange(stateValue + 1)}>Increase</button>
      <button onClick={() => onDecrease(stateValue - 1)}>Decrease</button>
    </div>
  );
};

export default Counter;
