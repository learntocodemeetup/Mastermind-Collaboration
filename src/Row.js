import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Circle from './Circle';
import SmallCircle from './SmallCircle';

class Row extends Component {

    static propTypes = {
        feedbackArray: PropTypes.arrayOf(PropTypes.string).isRequired,
        rowIndex: PropTypes.number.isRequired,
        rowColorsArray: PropTypes.array.isRequired,
        setCircleColor: PropTypes.func.isRequired,
        activeColor: PropTypes.string.isRequired
    };

    render() {
        const bigCircleStyle = {borderColor: 'grey', borderWidth: '2px'};
        const smallCircleStyle = {borderColor: 'black', borderWidth: '1px'};
        const activeRowClass = this.props.isActiveRow ? "row active-row" : "row";

        const feedback = this.props.feedbackArray.map(
            (color, index) => {
                return (
                    <SmallCircle
                        key={index}
                        color={color}
                        size='small'
                        css={smallCircleStyle}
                    />
                );
            }
        );

        const coloredCircles = this.props.rowColorsArray.map(
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
        );
        return (


            <div className={activeRowClass}>
                { coloredCircles }
                { feedback }
            </div>
        );
    }
}

export default Row;
