import React from 'react';

const TextBoxQuestion = ( { _id, questionText} ) => {
    return (
        <div id={_id}>
            <span>{questionText}</span>
            <span>
                <input className="text-area-style" type="text"/>
            </span>
        </div>
    );
}

export default TextBoxQuestion