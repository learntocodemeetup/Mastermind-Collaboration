import React, {Component} from 'react';
import PropTypes from 'prop-types';


class SmallCircle extends Component {

    static propTypes = {
        color: PropTypes.string.isRequired,
    };

    render() {
        const smallSize = 12;

        const circleStyle = this.props.css !== undefined ? {
            ...this.props.css,
        } : {};

        circleStyle.width = smallSize;
        circleStyle.height = smallSize;
        return (
            <div
                className="circle"
                style={circleStyle}
            />
        );

    }
}

export default SmallCircle;
