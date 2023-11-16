import React from 'react';

const InfoBar = ({ title }) => {
    return (
        <div className="info-bar">
            <div className="info-bar__title">
                <p>{title}</p>
            </div>
        </div>
    );
}

export default InfoBar;
