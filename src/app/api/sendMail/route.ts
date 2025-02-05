import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    const { name, email, phone, placement, description, placementFile, referenceFiles } = await req.json();

    const attachmentPath = placementFile;

    if (!name || !email || !phone || !placement || !description) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const attachments = [];
        if (placementFile) {
            const filePath = path.join(process.cwd(), 'public', 'tmp', placementFile);
            attachments.push({
                filename: placementFile.split('/').pop(),
                path: filePath,
                cid: 'placement',
            });
        }

        if (referenceFiles) {
            referenceFiles.forEach((file) => {
                if (file) {
                    const filePath = path.join(process.cwd(), 'public', 'tmp', file);
                    attachments.push({
                        filename: file.split('/').pop() + '.png',
                        path: filePath,
                    });
                }
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECIPIENT,
            subject: 'Nová rezervace - B00king',
            html: `
            <h1>Nová rezervace</h1>
            <p><strong>Jméno:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone}</p>
            <p><strong>Umístění:</strong> ${placement}</p>
            <p><strong>Popis:</strong> ${description}</p>
            ${attachments.length > 0 ? `<img src="cid:placement" alt="Umístění">` : ''}
            `,
            attachments,
        };

        await transporter.sendMail(mailOptions);

        // Smazání souborů
        if (placementFile) {
            const filePath = path.join(process.cwd(), 'public', 'tmp', placementFile);
            fs.unlinkSync(filePath);
        }
        if (referenceFiles) {
            referenceFiles.forEach((file) => {
                if (file){
                    const filePath = path.join(process.cwd(), 'public', 'tmp', file);
                    fs.unlinkSync(filePath);
                } 
            });
        }

        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Email failed to send' }), { status: 500 });
    }
}
