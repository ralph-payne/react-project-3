import React, { Fragment } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';

import '../../styles/QuestionToolbar.css';

const ToolbarItem =  ( { icon, title, index, changeQuestionTypeView } ) => {

    // static.defaultProps = {
    //     title: 'static Title',
    //     icon: 'fas fa-poll'
    // }

    return (
        <Fragment>
            {/* <div className="toolbar-item-heading" id={title} onClick={changeQuestionTypeView}> */}
                <i id={`typ-ico-${index}`} className={`${icon} mar-x-1`} onClick={changeQuestionTypeView}></i>
                <span id={`typ-chi-${index}`} onClick={changeQuestionTypeView}>{title}</span>
            {/* </div> */}
        </Fragment>
    );
}

ToolbarItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

export default ToolbarItem