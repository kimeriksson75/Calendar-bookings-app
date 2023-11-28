import React from 'react';

const InfoBar = ({ title, description }) => {
    return (
        <div className="info-bar">
            <div className="info-bar__title">
                <h3>{title}</h3>
                {description && <p>{description}</p>}
            </div>
        </div>
    );
}

export default InfoBar;
