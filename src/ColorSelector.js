import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SpecialCircle from './SpecialCircle';

import headCheck from './head-check.svg';

class ColorSelector extends Component {

    static propTypes = {
        setActiveColor: PropTypes.func.isRequired,
        colorsArray: PropTypes.array.isRequired,
        comparisonCheck: PropTypes.func.isRequired,
        activeColor: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="color-selector">

                {this.props.colorsArray.map(
                    (color, index) => {
                        return (
                            <SpecialCircle
                                key={index}
                                color={color}
                                setActiveColor={this.props.setActiveColor}
                                size="big"
                                activeColor={this.props.activeColor}
                            />
                        );

                    }
                )}

                <img
                    className="head-check-image"
                    src={headCheck}
                    onClick={this.props.comparisonCheck}
                    title="Check how smart you are"

                />


            </div>
        );

    }
}

export default ColorSelector;
