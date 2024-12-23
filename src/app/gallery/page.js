"use client";
import React, { useEffect } from 'react';
import Instafeed from 'instafeed.js';
import '/src/styles/gallery.css';

export default function Gallery() {
    useEffect(() => {
        const userFeed = new Instafeed({
            accessToken: 'TOKEN',
            target: 'instafeed-container', 
            template: '<a href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}" /></a>',
            resolution: 'low_resolution',
        });

        userFeed.run();
    }, []);

    return (
        <div className="gallery">
            <h1>Galerie</h1>
            <div id="instafeed-container" />
        </div>
    );
}
