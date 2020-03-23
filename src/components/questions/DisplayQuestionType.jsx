import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ShortAnswer from './questionTypes/ShortAnswer.jsx';
import Paragraph from './questionTypes/Paragraph.jsx';
import TrueFalse from './questionTypes/TrueFalse.jsx';
import FivePointScale from './questionTypes/FivePointScale.jsx';
import SevenPointScale from './questionTypes/SevenPointScale.jsx';

const DisplayQuestionType = ( { questionType } ) => {

    if (questionType === 'Short answer') {
        return (
            <ShortAnswer/>
        )
    } else if (questionType === 'Paragraph') {
        return (
            <Paragraph/>
        )
    } else if (questionType === 'True / False') {
        return (
            <TrueFalse/>
        )
    } else if (questionType === 'Five-point Scale') {
        return (
            <FivePointScale/>
        )
    } else if (questionType === 'Seven-point Scale') {
        return (
            <SevenPointScale/>
        )                        
    } else {
        return (
            <Fragment>
            <h1>Not recognised</h1>
            <h2>{questionType}</h2>
            </Fragment>
        )
    }
}

DisplayQuestionType.propTypes = {
    questionType: PropTypes.string.isRequired,
}

export default DisplayQuestionType

/*
<DisplayQuestionType questionType={this.state.questionTypeSelected}/>
*/