import React, {Component} from 'react';

import Row from './Row';
import Circle from './Circle';
import './App.css';

const rowsHeight = 10;
const rowsLength = 4;
var initialRowSetUp = [];
for (let i=0; i< rowsHeight;i++){
  initialRowSetUp[i]=[]
  for (let j=0; j< rowsLength;j++){
    initialRowSetUp[i][j] = 'white';
  }
}
const checkColor = [false, false,false,false,false,false];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mastermindLayout: initialRowSetUp,
            activeColor: 'red',
        };
    }

    setCircleColor(rowIndex, columnIndex,color){
      this.state.mastermindLayout[rowIndex][columnIndex] = color;
      this.setState(this.state);
    }

    setActiveColor(color) {
        this.setState({activeColor: color})
    }

    comparisonCheck(){
      //Guess is used temporarily, next steps, get color from user store in activerow
      var Guess = ["red", "yellow", "red", "pink"];
      var precise = 0;
      var partial = 0;
      for (let i = 0; i < Guess.length; i++) {
          if (Guess[i] === this.props.mastermindArray[i]) {
              precise += 1;
          }
          for (let j=0; j< this.props.mastermindArray.length; j++){

            if (Guess[i] === this.props.mastermindArray[j]) {
                for(let k=0; k < this.props.colorCircles.length;k++){
                    if(Guess[i] === this.props.colorCircles[k] && checkColor[k]==false){
                      checkColor[k]=true;
                      partial += 1;
                    }
                }
                break;
            }
          }
      }
      partial = partial - precise;

      console.log(`There were ${precise} precise`);
      console.log(`There were ${partial} partial`);
      console.log(`random generated array`,this.props.mastermindArray);
      console.log(`guess`,Guess);
    }

    render() {
        console.log(`initial mastermind layout`,this.state.mastermindLayout)
        const rows = [];

        const row = {
            activeColor: this.state.activeColor,
            rowFilled: () => console.log('Row complete'),
            /*smallCircles: ['white', 'white', 'white', 'white',],*/
        };

        for (let i = 0; i < 10; i++) {
            rows.push(row);
        }

        const reactRows = this.state.mastermindLayout.map(
            (row, index) => <Row
                key={index}
                activeColor={row.activeColor}
                rowFilled={row.rowFilled}
                /*smallCircles={row.smallCircles}*/
                rowColorsArray={this.state.mastermindLayout[index]}
                setCircleColor = this.setCircleColor.bind(this)
                />

        );

        const activeColor = this.props.colorCircles.map(
            (color, index) => <Circle
                key={index}
                color={color}
                size="big"
                css={
                    {
                        borderColor: color === this.state.activeColor ? 'red' : 'black'
                    }
                }
                onClick={() => this.setActiveColor(color)}/>
        );

        return (
            <div className="App">
                <h1>Mastermind</h1>
                <section className="gameBoard">
                    <div className="activeColors">{ activeColor }</div>
                    { reactRows }<button onClick={this.comparisonCheck.bind(this)}>check</button>
                </section>
            </div>
        );
    }
}

export default App;
