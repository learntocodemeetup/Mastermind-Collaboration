import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const colorCircles = ['green', 'blue', 'red', 'yellow','black','pink', 'white']

function createMastermindArray () {
  const rowLength= 4;
  var mastermindArray=[];
  for (let i=0;i<rowLength;i++){
    var color = colorCircles[Math.floor(Math.random()*6)]
    mastermindArray.push(color)
  }
  return mastermindArray;
}

ReactDOM.render(
  <App
    colorCircles = {colorCircles}
    mastermindArray = {createMastermindArray()}
  />, document.getElementById('root'));
registerServiceWorker();
