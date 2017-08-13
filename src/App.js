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
        const checkColor = [true, true, true, true];
        const guesses = this.state.mastermindLayout[this.state.activeRow];
        const mastermindAnswers = this.props.mastermindAnswers;
        const feedback = ['white', 'white', 'white', 'white'];

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

    render() {
        console.log(this.props.mastermindAnswers);
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
