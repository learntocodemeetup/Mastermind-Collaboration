import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

const DEFAULT_COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo'];
const DEFAULT_ANSWERS = ['red', 'orange', 'yellow', 'green'];

test('comparisonCheck returns a winning row',
    () => {
        const app = new App(
            {
                colorCircles: DEFAULT_COLORS,
                mastermindAnswers: DEFAULT_ANSWERS
            }
        );

        const feedbackRow = app.comparisonCheck(['red', 'orange', 'yellow', 'green'], app.props.mastermindAnswers);
        const winningRow = ['black', 'black', 'black', 'black'];
        expect(feedbackRow).toEqual(winningRow);
    }
);

test('expect App to load into initial state',
    () => {
        const app = <App colorCircles={DEFAULT_COLORS} mastermindAnswers={DEFAULT_ANSWERS}/>;
        let renderedApp = shallow(app);
        expect(renderedApp).toMatchSnapshot()
    }
);