import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header =  ( { icon, title } ) => {

    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon}></i> <Link to='/'>{title}</Link>
            </h1>
        </nav>
    );
}

Header.defaultProps = {
    title: 'Header Title',
    icon: 'fas fa-poll'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Header