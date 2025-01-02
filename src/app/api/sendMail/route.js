import nodemailer from 'nodemailer';

export async function POST(req) {
    const { name, email, phone, placement, description } = await req.json();

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
            `,
        };

        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Email failed to send' }), { status: 500 });
    }
}