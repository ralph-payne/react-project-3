/*
Capital Letters
Centered text
Purple Text
White background

*/



import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '../../styles/HeaderWithLogo.css';
// import '../App.css'

const HeaderWithLogo =  ( { icon, title } ) => {

    return (
        <Fragment>
            <div className="purple-uxd all-caps">
                <i className={`${icon} mar-x-1`}></i>
                {title}
                {/* <Link to='/' className="all-caps">{title.toUpperCase()}</Link> */}
            </div>
        </Fragment>
    );
}

HeaderWithLogo.defaultProps = {
    title: 'HeaderWithLogo Title',
    icon: 'fas fa-poll'
}

HeaderWithLogo.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default HeaderWithLogo