import React from 'react';

const InfoBar = ({ title }) => {
    return (
        <div className="info-bar">
            <div className="info-bar__title">
                <h3>{title}</h3>
            </div>
        </div>
    );
}

export default InfoBar;