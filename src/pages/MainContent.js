import React, { useState } from 'react';
import '../styles/MainContent.css'; 
import BGVid from '../img/background_video.mp4';
import BGImg from '../img/bgb.png';
import { Link } from 'react-router-dom'; 

function MainContent() {
    return (
        <main>
            <div>
                <img className='bg' src={BGImg} alt='backup-background' z-index="-2"/>
                <video className='video' autoPlay loop muted playsInline preload='auto'>
                    <source src={BGVid} type='video/mp4' />
                </video>
            </div>
            <div className="introduction">
                <h1>Dí Rezo Daněk</h1>
                <p>tatér od roku 2013</p>
                <p>tetování Znojmo & Brno</p>
                <Link to='/booking' className="booking-button">Booking</Link>
            </div>
        </main>
    );
}

export default MainContent;