import { POST } from '../route'
import { NextResponse } from 'next/server'

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn().mockImplementation((body) => ({ body })),
    },
}))

describe('Contact API Route', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        console.log = jest.fn()
    })

    it('should return success response', async () => {
        const mockData = { name: 'Test User', email: 'test@example.com', message: 'Hello' }
        const mockRequest = {
            json: jest.fn().mockResolvedValue(mockData),
        } as unknown as Request

        const response = await POST(mockRequest)

        expect(mockRequest.json).toHaveBeenCalled()
        expect(console.log).toHaveBeenCalledWith('Contact form:', mockData)
        expect(NextResponse.json).toHaveBeenCalledWith({ success: true })
        expect(response).toBeDefined()
    })

    it('should handle empty data', async () => {
        const mockData = {}
        const mockRequest = {
            json: jest.fn().mockResolvedValue(mockData),
        } as unknown as Request

        const response = await POST(mockRequest)

        expect(mockRequest.json).toHaveBeenCalled()
        expect(console.log).toHaveBeenCalledWith('Contact form:', {})
        expect(NextResponse.json).toHaveBeenCalledWith({ success: true })
        expect(response).toBeDefined()
    })

    it('should handle request JSON parsing error', async () => {
        const mockRequest = {
            json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
        } as unknown as Request

        await expect(POST(mockRequest)).rejects.toThrow('Invalid JSON')
        expect(mockRequest.json).toHaveBeenCalled()
        expect(NextResponse.json).not.toHaveBeenCalled()
    })
})