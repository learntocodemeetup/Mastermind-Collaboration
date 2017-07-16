import React, {Component} from 'react';
import PropTypes from 'prop-types';

import style from './Circle.css';

class Circle extends Component {

    static propTypes = {
        color: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
    }

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
        return <div className="circle" style={circleStyle} onClick={function() {this.props.setCircleColor()}}/>
    }
}

export default Circle;
