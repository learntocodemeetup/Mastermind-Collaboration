import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let colorCircles = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo'];

function createMastermindArray () {
  const rowLength= 4;
  const mastermindAnswers = [];
  for (let i=0; i < rowLength; i++) {
    let color = colorCircles[Math.floor(Math.random() * 6)];
    mastermindAnswers.push(color)
  }
  return mastermindAnswers;
}

const mastermindArray = createMastermindArray();

ReactDOM.render(
  <App
    colorCircles={colorCircles}
    mastermindAnswers={mastermindArray}
  />,
  document.getElementById('root')
);
registerServiceWorker();
