"use client";
import React, { useState } from 'react';
import Alert from '@/components/Alert/Alert';
import './booking.css';

export default function Booking() {
    // proměnné pro hodnoty z formulářů
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [placement, setPlacement] = useState('');
    const [description, setDescription] = useState("");

    // proměnné pro soubory
    const [placementFile, setPlacementFile] = useState(null);
    const [referenceFiles, setReferenceFiles] = useState([null, null, null, null]);

    // proměnné pro zobrazení alertu
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // proměnná pro max. délku
    const maxDescriptionLength = 800;

    // proměnné pro validaci souborů
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSizeMB = 3;

    // alert
    const showCustomAlert = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
    };

    // validace souborů
    const validateFile = (file) => {
        if (!file) return null;

        if (!allowedTypes.includes(file.type)) {
            showCustomAlert("Povoleny jsou pouze soubory .jpg, .png a .webp!");
            return null;
        }

        if (file.size > maxSizeMB * 1024 * 1024) {
            showCustomAlert(`Maximální velikost souboru je ${maxSizeMB} MB!`);
            return null;
        }

        return file;
    };


    const handlePlacementFileChange = async (e) => {
        const file = validateFile(e.target.files[0]);
        if (file) {
            console.log('setting file', file);
            const filePath = await uploadFile(file);
            console.log('asisi', filePath);
            setPlacementFile(filePath);
        }
    };

    const handleReferenceFileChange = async (index, e) => {
        const file = e.target.files[0]; 
        if (file) {
            try {
                const filePath = await uploadFile(file);

                if (filePath) {
                    setReferenceFiles((prevFiles) => {
                        const newFiles = [...prevFiles];
                        newFiles[index] = filePath;  
                        return newFiles;
                    });
                }
            } catch (error) {
                console.error("Chyba při uploadu souboru", error);
            }
        }
    };

    // hodnoty ve formuláři a jejich validace
    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        if (text.length <= maxDescriptionLength) {
            setDescription(text);
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setName(value);
        } else {
            showCustomAlert("Jméno nesmí být delší než 50 znaků.");
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value.length <= 50 && !emailPattern.test(value)) {
            showCustomAlert("Zadejte platnou e-mailovou adresu.");
        }

        setEmail(value);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const phonePattern = /^[0-9+ ]*$/;

        if (!phonePattern.test(value)) {
            showCustomAlert("Telefonní číslo může obsahovat pouze číslice.");
            return;
        }

        if (value.length <= 16) {
            setPhone(value);
        } else {
            showCustomAlert("Telefonní číslo nesmí být delší než 15 znaků.");
        }
    };

    const handlePlacementChange = (e) => {
        const value = e.target.value;
        if (value.length <= 100) {
            setPlacement(value);
        } else {
            showCustomAlert("Umístění tetování nesmí být delší než 100 znaků.");
        }
    };

    // upload souboru
    const uploadFile = async (file) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.publicFileID; 
            } else {
                throw new Error('Nahrání souboru se nezdařilo.');
            }
        } catch (error) {
            console.error(error);
            alert('Chyba při nahrávání souboru.');
            return null;
        }
    };

    // odeslání formuláře
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !placement || !description) {
            showCustomAlert("Vyplňte prosím všechna povinná pole.");
            return;
        }

        try {
            console.log('placementFile', placementFile);
            const response = await fetch('/api/sendMail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, placement, description, placementFile, referenceFiles }),
            });

            if (response.ok) {
                showCustomAlert("Formulář byl úspěšně odeslán.");
            } else {
                showCustomAlert("Nastala chyba při odesílání formuláře.");
            }
        } catch (error) {
            console.error(error);
            showCustomAlert("Nastala chyba při komunikaci se serverem.");
        }
    };

    // htmlko
    return (
        <div className="booking">
            <h1>Booking</h1>
            {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}
            <div className="form-group">
                <label htmlFor="name">Jméno *</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Vaše jméno"
                    required
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Váš e-mail"
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Telefon *</label>
                <input
                    type="tel"
                    id="phone"
                    placeholder="Vaše telefonní číslo"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="placement">Umístění tetování *</label>
                <input
                    type="text"
                    id="placement"
                    placeholder="stehno, předloktí, kotník..."
                    required
                    value={placement}
                    onChange={handlePlacementChange}
                />
            </div>

            {/* fotografie umístění */}
            <div className="form-group">
                <label htmlFor="placement-photo">Fotografie umístění</label>
                <div className="file-input">
                    <label htmlFor="placement-photo" className="custom-button">Vyberte soubor</label>
                    <input
                        type="file"
                        id="placement-photo"
                        className="hidden-file"
                        accept=".jpg, .jpeg, .png, .webp"
                        onChange={handlePlacementFileChange}
                    />
                    <span className="file-description">
                        {placementFile || `(max. ${maxSizeMB}MB, .jpg, .png, .webp)`}
                    </span>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description">Popis *</label>
                <textarea
                    id="description"
                    placeholder="Popište Vaši představu o motivu, barvách, kompozici..."
                    required
                    rows={4}
                    maxLength={maxDescriptionLength}
                    value={description}
                    onChange={handleDescriptionChange}
                ></textarea>
                <div className="file-description" style={{ textAlign: 'right' }}>
                    {description.length} / {maxDescriptionLength}
                </div>
            </div>

            {/* fotografie reference */}
            <div className="reference-photos">
                {referenceFiles.map((fileName, index) => (
                    <div className="file-input" key={index}>
                        <label htmlFor={`file-upload-${index}`} className="custom-button">Vyberte soubor</label>

                        <input
                            type="file"
                            id={`file-upload-${index}`}
                            className="hidden-file"
                            accept=".jpg, .jpeg, .png, .webp"
                            onChange={(e) => handleReferenceFileChange(index, e)}
                        />

                        <span className="file-description">
                            {fileName || `Není zvolen žádný soubor (max. ${maxSizeMB}MB, .jpg, .png, .webp)`}
                        </span>
                    </div>
                ))}
            </div>


            <div className="form-group" style={{ marginTop: '20px' }}>
                <button type="submit" onClick={handleSubmit}> Odeslat</button>
            </div>
        </div>
    );
}
