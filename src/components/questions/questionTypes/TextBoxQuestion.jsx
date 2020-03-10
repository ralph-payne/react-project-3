import React from 'react';

const TextBoxQuestion = ( { _id, questionText} ) => {
    return (
        <div id={_id}>
            <span>{questionText}</span>
            <span>
                <input type="text"/>
            </span>
        </div>
    );
}

export default TextBoxQuestion