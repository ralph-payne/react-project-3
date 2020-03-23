import React, { Fragment } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';

import ToolbarItem from './ToolbarItem.jsx';
import '../../styles/QuestionToolbar.css';

const QuestionToolbar = ( { changeQuestionTypeView } ) => {

    const arrayOfToolbarItems = [ 'Short answer', 'Paragraph', 'True / False', 'Five-point Scale', 'Seven-point Scale' ]

    return (
        <Fragment>
            {
                arrayOfToolbarItems.map((element, index) => (
                <div
                    id={`typ-div-${index}`} 
                    className="toolbar-item-heading purple-uxd" 
                    key={index} 
                    onClick={changeQuestionTypeView}>
                                        
                    <ToolbarItem 
                    changeQuestionTypeView={changeQuestionTypeView}
                    icon="fas fa-poll" 
                    title={element}
                    index={index}
                    />
                
                </div>
                ))
            }

        </Fragment>
    )
}


export default QuestionToolbar