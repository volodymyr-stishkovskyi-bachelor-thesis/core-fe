import { NextResponse } from 'next/server';
import { GET } from '../route';

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

const originalEnv = process.env;

describe('GET handler for leetcode API route', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...originalEnv };
        process.env.NEXT_PUBLIC_API_HOST = 'https://api.example.com';
        global.fetch = jest.fn();
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('should fetch leetcode data and return it as JSON', async () => {
        const mockData = { problems: [{ id: 1, title: 'Two Sum' }] };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        await GET();

        expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/leetcode');
        expect(NextResponse.json).toHaveBeenCalledWith(mockData);
    });

    it('should return 500 error when fetch fails', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        await GET();

        expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/leetcode');
        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: 'Failed to fetch leetcode data' },
            { status: 500 }
        );
    });

    it('should return 500 error when response is not ok', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await GET();

        expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/leetcode');
        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: 'Failed to fetch leetcode data' },
            { status: 500 }
        );
    });

    it('should handle missing API host', async () => {
        delete process.env.NEXT_PUBLIC_API_HOST;

        await GET();

        expect(global.fetch).toHaveBeenCalledWith('undefined/leetcode');
        expect(NextResponse.json).toHaveBeenCalledWith(
            { error: 'Failed to fetch leetcode data' },
            { status: 500 }
        );
    });
});