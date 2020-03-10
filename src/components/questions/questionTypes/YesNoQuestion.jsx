import React from 'react';

const YesNoQuestion =  ( { _id, questionText } ) => {

    return (
        <div key={_id}>

            <p>{questionText}</p>

            <p>yes no options</p>

        </div>
    );
}

export default YesNoQuestion