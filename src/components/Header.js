"use client";
import { useState } from 'react';
import Link from 'next/link';
import '/src/styles/header.css'; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="logo">
        <Link href="/"><img src="/img/logoW.png" alt="Logo" /></Link>
      </div>
      
      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6l12 12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7H19" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12L19 12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 17L19 17" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><Link href="/about" onClick={toggleMenu}>O mně</Link></li>
        <li><Link href="/gallery" onClick={toggleMenu}>Galerie</Link></li>
        <li><Link href="/booking" onClick={toggleMenu}>Booking</Link></li>
        <li><Link href="/contact" onClick={toggleMenu}>Kontakt</Link></li>
      </ul>
    </nav>
  );
}
