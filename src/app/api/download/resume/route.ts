import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src/app/api/download/resume/volodymyr-cv.pdf');

  try {
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="volodymyr-cv.pdf"',
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}