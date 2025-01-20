import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const POST = async (req) => {
    const form = await req.formData();

    const file = form.get('file');
    if (!file) {
        return NextResponse.json({ message: 'Soubor nebyl nahrán!' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const publicFileID = nanoid();

    const filePath = path.join(process.cwd(), 'public', 'tmp', publicFileID);
    try {
        fs.writeFile(filePath, Buffer.from(buffer));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Soubor se nepodařilo nahrát!' }, { status: 500 });
    }

    console.log('Received POST request');
    console.log('Request Headers:', req.headers);
    return NextResponse.json({
        message: 'Soubor byl úspěšně nahrán!',
        publicFileID,
    });
};
