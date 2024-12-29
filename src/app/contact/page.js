import './contact.css'; 

export default function Contact() {
    return (
        <div className="contact">
            <h1>Kontakt</h1>
            <p>Email: rezotattoo@gmail.com</p>
            <p><a href="https://www.instagram.com/direzodanek/" target='_blank' rel="noopener noreferrer">Instagram: @direzodanek</a></p>
            <p><a href="https://www.facebook.com/didanektattooer" target='_blank' rel="noopener noreferrer">Facebook: Dí ''Rezo'' Daněk tattooer</a></p>
            <p className="phone"><a href="tel:+420731810589">Telefon: +420 731 810 589</a></p>
            <p className="desktop">Telefon: +420 731 810 589</p>
            <p>ičo: 06125263</p>
            <h2>Kde mě najdete</h2>
            <iframe 
                title="RezoTattoo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1169.4417204194915!2d16.052347442213012!3d48.85234022673933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d5500adb275e9%3A0x4e9ceab4260495db!2sRezoTattoo!5e0!3m2!1scs!2scz!4v1734815816520!5m2!1scs!2scz"
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}
