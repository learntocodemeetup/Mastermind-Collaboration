import React, {Component} from 'react';
import PropTypes from 'prop-types';


import Row from './Row';
import ColorSelector from './ColorSelector'

import './index.css';

const ROWS_HEIGHT = 10;
const ROWS_LENGTH = 4;

class App extends Component {

    static propTypes = {
        colorCircles: PropTypes.arrayOf(PropTypes.string).isRequired,
        mastermindAnswers: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    static initialSetup() {
        let state = {
            activeColor: 'red',
            activeRow: 0,
            winner: false,
            precise: 0,
            partial: 0
        };
        let mastermindLayout = [];
        for (let i = 0; i < ROWS_HEIGHT; i++) {
            const coloredRow = [];
            for (let j = 0; j < ROWS_LENGTH; j++) {
                coloredRow.push('white');
            }
            mastermindLayout.push(coloredRow);
        }

        state.mastermindLayout = mastermindLayout;
        state.feedbackArray = mastermindLayout.map((val) => val.slice());
        return state
    }

    constructor(props) {
        super(props);
        this.state = App.initialSetup();
    }

    setActiveColor = (color) => {
        this.setState({activeColor: color})
    };

    setCircleColor = (rowIndex, columnIndex) => {
        let mastermindLayout = this.state.mastermindLayout;
        mastermindLayout[rowIndex][columnIndex] = this.state.activeColor;
        if (rowIndex === this.state.activeRow) {
            this.setState({mastermindAnswers: mastermindLayout});
        }
    };

    comparisonCheck = () => {

        let precise = 0;
        let partial = 0;
        let activeRow = this.state.activeRow;

        const checkColor = [false, false, false, false];

        console.log("active row is:", this.state.mastermindLayout[this.state.activeRow]);
        let guessRow = this.state.mastermindLayout[this.state.activeRow];
        guessRow.forEach(
            (guess, index) => {
                let mastermindAnswers = this.props.mastermindAnswers;

                if (guess === mastermindAnswers) {
                    precise += 1;
                }

                if (mastermindAnswers.indexOf(guess) !== -1 && checkColor[index] === false) {
                    checkColor[index] = true;
                    partial++;
                }
            }
        );

        partial = Math.max(partial - precise, 0);

        activeRow++;
        console.log("active row is", activeRow);
        console.log(`mastermind array is:`, this.props.mastermindAnswers);
        console.log(`our guess is:`, guessRow);
        console.log(`There were ${precise} precise guesses`);
        console.log(`There were ${partial} partial guesses`);

        if (precise === 4) {
            this.setState({winner: true, activeRow, partial, precise});
            console.log("You win!");
        } else {
            this.setState({winner: false, activeRow, partial, precise});
            console.log("Wrong!!!");
        }


    };

    render() {
        console.log(this.state);
        const reactRows = this.state.mastermindLayout.map(
            (row, index) => {
                const rowColorsArray = this.state.mastermindLayout[index];
                const feedbackArray = this.state.feedbackArray[index];
                const isActive = this.state.activeRow === index;

                return (
                    <Row
                        key={index}
                        rowIndex={index}
                        feedbackArray={feedbackArray}
                        isActiveRow={isActive}
                        rowColorsArray={rowColorsArray}
                        setCircleColor={this.setCircleColor}
                        precise={this.state.precise}
                        partial={this.state.partial}
                        activeColor={this.state.activeColor}
                    />
                );
            }
        );

        return (
            <div className="App">
                <h1>Mastermind</h1>
                {this.state.winner ? <p>Winner!</p> : ""}
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
