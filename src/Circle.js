import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Circle extends Component {

    static propTypes = {
        color: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        setCircleColor: PropTypes.func.isRequired,
        rowIndex: PropTypes.number.isRequired,
        circleIndex: PropTypes.number.isRequired
    };

    render() {
        const bigSize = 40;
        const smallSize = 12;
        const circleStyle = this.props.css !== undefined ? {
            ...this.props.css,
        } : {};
        if (this.props.size === 'big') {
            circleStyle.backgroundColor = this.props.color;
            circleStyle.margin = '0 0.25rem';
            circleStyle.width = bigSize;
            circleStyle.height = bigSize;
        }
        else {
            circleStyle.width = smallSize;
            circleStyle.height = smallSize;
        }
        // rowIndex, columnIndex,color
        let rowIndex = this.props.rowIndex;
        let circleIndex = this.props.circleIndex;
        return (
            <div
                className="circle"
                style={circleStyle}
                onClick={() => this.props.setCircleColor(rowIndex, circleIndex)}
            />
        );

    }
}

export default Circle;
