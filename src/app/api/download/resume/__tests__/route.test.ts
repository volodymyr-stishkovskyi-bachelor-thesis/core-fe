jest.mock('next/server', () => {
    return {
        NextResponse: class {
            status: number
            headers: Map<string, string>
            body: any
            constructor(body: any, init?: { status?: number; headers?: Record<string, string> }) {
                this.body = body
                this.status = init?.status ?? 200
                this.headers = new Map(Object.entries(init?.headers ?? {}))
            }
            async text () {
                return typeof this.body === 'string' ? this.body : ''
            }
            async arrayBuffer () {
                if (Buffer.isBuffer(this.body)) return this.body
                if (this.body instanceof Uint8Array) return this.body.buffer
                return new ArrayBuffer(0)
            }
        }
    }
})

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
    },
}))

import { GET } from '../route'
import { promises as fs } from 'fs'
import path from 'path'

describe('GET /api/download/resume', () => {
    const filePath = path.join(
        process.cwd(),
        'src/app/api/download/resume/volodymyr-cv.pdf'
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('returns the PDF buffer with the correct headers when file exists', async () => {
        const pdfBuffer = Buffer.from('MOCK_PDF')
            ; (fs.readFile as jest.Mock).mockResolvedValue(pdfBuffer)

        const res = await GET()

        expect(fs.readFile).toHaveBeenCalledWith(filePath)

        expect(res.status).toBe(200)
        expect(res.headers.get('Content-Type')).toBe('application/pdf')
        expect(res.headers.get('Content-Disposition')).toBe(
            'attachment; filename="volodymyr-cv.pdf"'
        )

        const arrayBuf = await (res as any).arrayBuffer()
        expect(Buffer.from(arrayBuf)).toEqual(pdfBuffer)
    })

    it('returns 404 and error text when file is missing', async () => {
        ; (fs.readFile as jest.Mock).mockRejectedValue(new Error('nope'))

        const res = await GET()

        expect(fs.readFile).toHaveBeenCalledWith(filePath)
        expect(res.status).toBe(404)
        const txt = await (res as any).text()
        expect(txt).toBe('File not found')
    })
})