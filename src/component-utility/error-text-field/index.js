import React from "react";

const style = {
    fontSize: "0.8rem",
}

const ErrorTextField = ({message, field}) => {
    return <>{message ?
        <span className="text-error text-danger" style={style}>{message}</span> : "Hợp lệ!"}</>
}

export default ErrorTextField;