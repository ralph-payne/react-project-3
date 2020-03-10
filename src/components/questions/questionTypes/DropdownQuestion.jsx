import React from 'react';
import PropTypes from 'prop-types';

const DropdownQuestion = ( { _id, questionText, options} ) => {

    return (
        <div key={_id}>
            <label htmlFor="question-type">{questionText}</label>
                <select id="question-type" name="questionType">
                    <option value="Select">Select</option>
                    {options.map( ele => {
                        return (
                            <option value={ele}>{ele}</option>
                        )})}
                </select>
        </div>
    );
}

DropdownQuestion.propTypes = {
    options: PropTypes.array.isRequired
}

export default DropdownQuestion