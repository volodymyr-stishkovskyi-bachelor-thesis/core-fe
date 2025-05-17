import { NextResponse } from 'next/server';

export async function GET () {
  try {
    const apiHost = process.env.NEXT_PUBLIC_API_HOST;
    const response = await fetch(`${apiHost}/leetcode`);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching leetcode data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leetcode data' },
      { status: 500 }
    );
  }
}

