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

    comparisonCheck(guesses, mastermindAnswers) {
        const feedback = ['white', 'white', 'white', 'white'];
        const checkColor = [true, true, true, true];

        guesses.forEach(
            (guessColor, guessIndex) => {
                if (guessColor === mastermindAnswers[guessIndex]) {
                    feedback[guessIndex] = 'black';
                    checkColor[guessIndex] = false;
                }
            }
        );

        guesses.forEach(
            (guessColor, guessIndex) => {
                const canCheckGuess = checkColor[guessIndex];
                if (canCheckGuess) {
                    mastermindAnswers.find(
                        (answerColor, answerIndex) => {
                            const canCheckAnswer = checkColor[answerIndex];
                            if (!canCheckAnswer) return false;

                            if (answerColor === guessColor) {
                                feedback[guessIndex] = 'red';
                                checkColor[answerIndex] = false;
                                return true;
                            }
                            return false;
                        }
                    );
                }
            }
        );
        return feedback.sort();
    };

    judgeRow = () => {
        const guesses = this.state.mastermindLayout[this.state.activeRow];
        const mastermindAnswers = this.props.mastermindAnswers;

        if(guesses.indexOf('white') !== -1 && !this.state.winner) return null;

        const feedback = this.comparisonCheck(guesses, mastermindAnswers);
        const isWinner = feedback.every((color) => color === 'black');

        const feedbackArray = this.state.feedbackArray.map(
            (val, index) => {
                if (index === this.state.activeRow) {
                    return feedback;
                }
                else {
                    return val;
                }
            }
        );

        let activeRow = this.state.activeRow;
        if(!isWinner) activeRow++;

        this.setState({feedbackArray: feedbackArray, winner: isWinner, activeRow: activeRow})
    };

    render() {
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
                        activeColor={this.state.activeColor}
                    />
                );
            }
        );

        return (
            <div className="App">
                <h1>Mastermind</h1>
                <h1> this should not exist </h1>
                {this.state.winner ? <p>Winner!</p> : ""}
                <section className="gameBoard">
                    <div className="rows">
                        { reactRows }
                    </div>
                    <ColorSelector
                        activeColor={this.state.activeColor}
                        setActiveColor={this.setActiveColor}
                        colorsArray={["red", "orange", "yellow", "green", "blue", "indigo"]}
                        comparisonCheck={this.judgeRow}
                    />

                </section>

            </div>
        );
    }
}

export default App;
