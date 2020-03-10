import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ( { icon, title } ) => {

    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon}></i> {title}
            </h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/create-survey'>Create</Link>
                </li>
                <li>
                    <Link to='/surveys'>Surveys</Link>
                </li>
                <li>
                    <Link to='/view-survey'>Read</Link>
                </li>
                <li>
                    <Link to='/edit-survey'>Update</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>

        </nav>
    );
}

Navbar.defaultProps = {
    title: 'Navbar Title',
    icon: 'fas fa-poll'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar