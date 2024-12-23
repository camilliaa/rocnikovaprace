import Link from 'next/link';
import '/src/styles/page.css'; 

export default function MainContent() {
    return (
        <main>
            <div>
                <img className='bg' src="/img/bg.png" alt='backup-background' z-index="-2"/>
                <video className='video' autoPlay loop muted playsInline preload='auto'>
                    <source src="/img/background_video.mp4" type='video/mp4' />
                </video>
            </div>
            <div className="introduction">
                <h1>Dí Rezo Daněk</h1>
                <p>tatér od roku 2013</p>
                <p>tetování Znojmo & Brno</p>
                <Link href='/booking' className="booking-button">
                    Booking
                </Link>
            </div>
        </main>
    );
}
