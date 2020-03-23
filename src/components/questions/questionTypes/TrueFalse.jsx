import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';

const TrueFalse = ( ) => {

    return (
        <Fragment>

                <label className="container">True
                    <input type="radio" name="true-false"/>
                    <span className="checkmark"></span>
                </label>

                <label className="container">False
                    <input type="radio" name="true-false"/>
                    <span className="checkmark"></span>
                </label>

        </Fragment>
    )

}

export default TrueFalse