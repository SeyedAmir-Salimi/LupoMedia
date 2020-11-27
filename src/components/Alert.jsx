import React from 'react'

const Alert = ({alertText}) => {
    return (
        <div className="alert">
            <div className="alert-Red">
                <div className="alert-Question">
                        <div>
                            <h3>{alertText}</h3>
                        </div>
                </div>
            </div>
        </div>)
}

export default Alert;