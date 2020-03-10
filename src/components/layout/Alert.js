import React from 'react';

// It takes in the alert, which is an object with message and type. You pass in the type of alert as a prop.
// As long as alert is not equal to null, then we want to show a div.
const Alert = ( { alert }) => {
    return (
        
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        )
    )
}

export default Alert