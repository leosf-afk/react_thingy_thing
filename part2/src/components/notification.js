import React from 'react'

const Notification = ({message, success}) => {
    if(message == null){
        return null
    }

    const _class = success ? "success" : "error" 

    return (
        <div className={_class}>
            {message}
        </div>
    )
}

export default Notification;