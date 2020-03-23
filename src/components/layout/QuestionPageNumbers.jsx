// QuestionPageNumbers is a child of SurveyDetails. This component renders a circle, which represents a question

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';

const QuestionPageNumbers = ( { ido } ) =>
/* 
cx is the x-axis coordinate of the center of the circle
cy is the y-axis coordinated of the center of the circle
r is the radius of the circle
*/

    <Fragment>
        <svg height="30" width="30">
            <circle id={ido} cx="15" cy="15" r="14" stroke="black" strokeWidth="1" fill='#DEC3FF' />
        </svg>
    </Fragment>

// QuestionPageNumbers.propTypes = {
//     numberOfQuestions: PropTypes.number.isRequired,
// }

export default QuestionPageNumbers