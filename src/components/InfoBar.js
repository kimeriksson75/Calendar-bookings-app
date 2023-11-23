import React from 'react';

const InfoBar = ({ title }) => {
    return (
        <div className="info-bar">
            <div className="info-bar__title">
                <h2>{title}</h2>
            </div>
        </div>
    );
}

export default InfoBar;
