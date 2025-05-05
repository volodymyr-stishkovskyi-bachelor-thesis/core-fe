import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    easy: 135,
    totalEasy: 874,
    medium: 653,
    totalMedium: 1836,
    hard: 26,
    totalHard: 829,
  });
}

