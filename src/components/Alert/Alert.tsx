"use client";
import React, { useState, useEffect } from 'react';
import './alert.css';

function Alert({ message, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose(); 
        }, 2000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!visible) return null;

    return (
        <div className="alert">
            {message}
        </div>
    );
}

export default Alert;