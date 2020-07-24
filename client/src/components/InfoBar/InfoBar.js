import React from 'react';
import './InfoBar.css';
import closeIcon from '../../images/closeIcon.png';
import onlineIcon from '../../images/onlineIcon.png';

const InfoBar = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftContainer">
                <img className="onlineIcon" src={onlineIcon} />
                <h3>{room}</h3>
            </div>
            <div className="rightContainer">
                <a href="/"><img src={closeIcon} alt="close image" /></a>
            </div>
        </div>
    );
};

export default InfoBar;