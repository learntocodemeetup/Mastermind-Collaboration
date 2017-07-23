import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import './Row.css';
import Circle from './Circle';

class Row extends Component {

    static propTypes = {
        //rowFilled: PropTypes.func.isRequired,
        //smallCircles: PropTypes.arrayOf(PropTypes.string).isRequired,
        rowIndex: PropTypes.number.isRequired,
        rowColorsArray: PropTypes.array.isRequired,
        setCircleColor: PropTypes.func.isRequired,
        precise: PropTypes.number.isRequired,
        partial: PropTypes.number.isRequired,
        activeColor: PropTypes.string.isRequired
    };

    /*
    handleBigCircle(index) {
        this.state.bigCircles[index] = this.props.activeColor;
        this.setState(this.state);
    }
    */


    /*
    rowComplete() {
        this.props.rowFilled(this.state.bigCircles)
    }
    */

    render() {
        const bigCircleStyle = {borderColor: 'grey', borderWidth: '2px'};
        // const smallCircleStyle = {borderColor: 'black', borderWidth: '1px'};
        var activeRowClass;
        var progress;
        if (this.props.isActiveRow) {
            activeRowClass = "row active-row";

        } else {
            activeRowClass = "row";
        }

        if (this.props.activeRow <= this.props.rowIndex ) {

            progress = `Precise: ${this.props.precise} Partial: ${this.props.partial}`

        }


        return (


            <div className={activeRowClass}>

                {
                    this.props.rowColorsArray.map(
                        (value, index) => {
                            return (
                                <Circle
                                    key={index}
                                    rowIndex={this.props.rowIndex}
                                    circleIndex={index}
                                    color={this.props.rowColorsArray[index]}
                                    size="big"
                                    css={bigCircleStyle}
                                    setCircleColor={this.props.setCircleColor}
                                />
                            );
                        }
                    )
                }

                <p>{progress}</p>

                {/*onClick={() => this.handleBigCircle(index)}*/}

                {/*
                <div className="fourDots">
                    {

                        this.props.smallCircles.map(
                            (value, index) =>
                                <Circle
                                    key={index}
                                    color={value}
                                    size="small"
                                    css={smallCircleStyle}/>
                        )
                    }

                </div>
                */}
            </div>
        );
    }
}

export default Row;
