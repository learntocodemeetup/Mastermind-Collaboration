import React, {Component} from 'react';
import PropTypes from 'prop-types';

// import './SpecialCircle.css';

class SpecialCircle extends Component {

    static propTypes = {
        color: PropTypes.string.isRequired,
        setActiveColor: PropTypes.func.isRequired,
        size: PropTypes.string.isRequired,
        css: PropTypes.object,
        activeColor: PropTypes.string.isRequired

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
        let activeStyling;
        if (this.props.color === this.props.activeColor) {
            activeStyling = "circle active-circle";
        } else {
            activeStyling = "circle"
        }
        return (
            <div
                className={activeStyling}
                style={circleStyle}
                onClick={() => this.props.setActiveColor(this.props.color)}
            />
        );

    }
}

export default SpecialCircle;
