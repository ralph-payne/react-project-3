import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import '../../../styles/QuestionTypes.css';

const FivePointScale = ( ) => {

    const arrayOfAnswers = 
        [   'strongly agree',
            'agree',
            'neutral',
            'disagree',
            'strongly disagree'
        ]

    return (

        <Fragment>
            {
                arrayOfAnswers.map((element, index) => {
                    return (
                    <label className="container-for-scale-question" key={index}>{element}
                    <input type="radio" name="five-point-scale"/>
                    <span className="checkmark"></span>
                    </label>
                    )
   
                })
            }
            </Fragment>     

    )

}

export default FivePointScale