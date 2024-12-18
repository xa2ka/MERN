import React from "react";
import './userInfo.css';

export const UserInfo = ({ fullName, additionalText }) => {
    return (
    <div className="root">
        <div className="userDetails">
            <span className="userName">{fullName}</span>
            <span className="additional">{additionalText}</span>
        </div>
    </div>
    );
  };