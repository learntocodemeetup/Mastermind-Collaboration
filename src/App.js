import React, {Component} from 'react';

import Row from './Row';
import ColorSelector from './ColorSelector'

import './index.css';

const rowsHeight = 10;
const rowsLength = 4;
let initialRowSetUp = [];
for (let i = 0; i < rowsHeight; i++) {
    initialRowSetUp[i] = [];
    for (let j = 0; j < rowsLength; j++) {
        initialRowSetUp[i][j] = 'white';
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mastermindLayout: initialRowSetUp,
            activeColor: 'red',
            activeRow: 0,
            winner: false,
            precise: 0,
            partial: 0
        };
        console.log(`initial mastermind layout`, this.state.mastermindLayout);
    }

    setActiveColor(color) {
        this.setState({activeColor: color})
    };

    setCircleColor(rowIndex, columnIndex) {
        let mastermindArray = this.state.mastermindLayout;
        mastermindArray[rowIndex][columnIndex] = this.state.activeColor;
        if (rowIndex === this.state.activeRow) {
            this.setState({mastermindLayout: mastermindArray});
        }


        // this.setState({
        //     mastermindLayout: this.state.mastermindLayout.map(function(row, index) {
        //         if (row.id !== index) {
        //             return row;
        //         } else {
        //             row[columnIndex] = this.state.activeColour;
        //             return row;
        //         }
        //
        //     })
        //
        // });

    };

    comparisonCheck() {

        let precise = 0;
        let partial = 0;
        let activeRow =  this.state.activeRow;

        const checkColor = [false, false, false, false];
        //Guess is used temporarily, next steps, get color from user store in activerow
        //var Guess = ["red", "yellow", "red", "indigo"];
        console.log("active row is:", this.state.mastermindLayout[this.state.activeRow]);
        let guess = this.state.mastermindLayout[this.state.activeRow];
        // debugger;
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === this.props.mastermindArray[i]) {
                precise += 1;
            }
            for (let j = 0; j < this.props.mastermindArray.length; j++) {

                if (guess[i] === this.props.mastermindArray[j]) {
                    for (let k = 0; k < this.props.mastermindArray.length; k++) {
                        if (guess[i] === this.props.mastermindArray[k] && checkColor[k] === false) {

                            checkColor[k] = true;

                            partial += 1;
                            break;
                        }
                    }
                    break;
                }
            }
        }
        partial = Math.max(partial - precise, 0);

        activeRow++;
        this.forceUpdate();
        console.log("active row is", activeRow);
        console.log(`mastermind array is:`, this.props.mastermindArray);
        console.log(`our guess is:`, guess);
        console.log(`There were ${precise} precise guesses`);
        console.log(`There were ${partial} partial guesses`);

        if (precise === 4) {
            this.setState({winner: true, activeRow, partial, precise});
            console.log("You win!");
        } else {
            console.log("Wrong!!!");
        }


    };

    render() {

        /*
         const rows = [];

         const row = {
         activeColor: this.state.activeColor,
         rowFilled: () => console.log('Row complete'),
         /*smallCircles: ['white', 'white', 'white', 'white',],
         };

         for (let i = 0; i < 10; i++) {
         rows.push(row);
         }
         */

        const reactRows = this.state.mastermindLayout.map(
            (row, index) => {
                const rowColorsArray = this.state.mastermindLayout[index];
                return (
                    <Row
                        key={index}
                        rowIndex={index}
                        isActiveRow={this.state.activeRow === index}
                        rowColorsArray={rowColorsArray}
                        setCircleColor={this.setCircleColor}
                        precise={this.state.precise}
                        partial={this.state.partial}
                        activeColor={this.state.activeColor}
                    />
                );
            }
        );

        // rowFilled={row.rowFilled}
        // smallCircles={row.smallCircles}

        /*
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
         */

        return (
            <div className="App">
                <h1>Mastermind</h1>
                {this.state.winner.true ? <p>Winner!</p> : ""}
                <section className="gameBoard">
                    <div className="rows">
                        { reactRows }
                    </div>
                    <ColorSelector
                        activeColor={this.state.activeColor}
                        setActiveColor={this.setActiveColor}
                        colorsArray={["red", "orange", "yellow", "green", "blue", "indigo"]}
                        comparisonCheck={this.comparisonCheck}
                    />

                </section>

            </div>
        );
    }
}

export default App;
