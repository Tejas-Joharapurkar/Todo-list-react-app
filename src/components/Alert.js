import React, { useEffect } from 'react';
import '../css/app.css'

const Alert = ({ msg, type, removealert, list }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            removealert()
        }, 3000)
        return () => clearTimeout(timeout);
    }, [list, removealert])
    return (
        <div className={`alert ${type}`}>{msg}</div>
    )

}
export default Alert;