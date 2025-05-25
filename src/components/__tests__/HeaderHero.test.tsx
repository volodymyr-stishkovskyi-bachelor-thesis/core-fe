import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { HeaderHero } from '../HeaderHero';

process.env.NEXT_PUBLIC_API_HOST = 'https://test-api.com';

describe('HeaderHero Component', () => {
    beforeAll(() => {
        global.fetch = jest.fn();
        global.URL.createObjectURL = jest.fn();
        global.URL.revokeObjectURL = jest.fn();

        const realCreateElement = document.createElement.bind(document);
        jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
            if (tagName === 'a') {
                const a = realCreateElement('a');
                a.href = '';
                a.download = '';
                a.click = jest.fn();
                a.remove = jest.fn();
                return a;
            }
            return realCreateElement(tagName);
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
        render(<HeaderHero />);
    });

    test('renders logo, name and title', () => {
        expect(screen.getByText('VS')).toBeInTheDocument();
        expect(screen.getByText('Volodymyr Stishkovskyi')).toBeInTheDocument();
        expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    });

    test('renders navigation links and toggles mobile menu', async () => {
        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass('hidden');

        const toggleBtn = screen.getByLabelText('Toggle Menu');
        await userEvent.click(toggleBtn);
        expect(nav).toHaveClass('flex', 'mt-4');

        await userEvent.click(toggleBtn);
        expect(nav).toHaveClass('hidden');
    });

    test('renders nav links with correct hrefs', () => {
        const links = [
            { text: 'Home', href: '#home' },
            { text: 'Services', href: '#services' },
            { text: 'About me', href: '#about' },
            { text: 'Contact me', href: '#contact' },
        ];
        links.forEach(({ text, href }) => {
            const link = screen.getByText(text).closest('a');
            expect(link).toHaveAttribute('href', href);
        });
    });

    test('renders social media icons with correct alt and href', () => {
        const socials = [
            { alt: 'LinkedIn', href: 'https://www.linkedin.com/in/volodymyr-stishkovskyi/' },
            { alt: 'Leetcode', href: 'https://leetcode.com/u/sweetmnstr/' },
            { alt: 'GitHub', href: 'https://github.com/sweetmnstr' },
        ];
        socials.forEach(({ alt, href }) => {
            const img = screen.getByAltText(alt);
            expect(img).toBeInTheDocument();
            expect(img.closest('a')).toHaveAttribute('href', href);
        });
    });

    test('Hire Me link is rendered and points to contact section', () => {
        const hireLink = screen.getByText('Hire Me').closest('a');
        expect(hireLink).toHaveAttribute('href', '#contact');
        expect(hireLink).toHaveClass('bg-orange-500', 'text-black', 'px-6', 'py-3');
    });

    test('Download my CV button triggers download logic', async () => {
        const blob = new Blob(['pdf'], { type: 'application/pdf' });
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            blob: jest.fn().mockResolvedValueOnce(blob),
        });
        (global.URL.createObjectURL as jest.Mock).mockReturnValueOnce('blob:url');

        const appendSpy = jest.spyOn(document.body, 'appendChild');

        const downloadBtn = screen.getByText('Download my CV');
        await userEvent.click(downloadBtn);

        await new Promise((r) => setTimeout(r, 0));

        expect(global.fetch).toHaveBeenCalledWith('https://test-api.com/resume');
        expect(appendSpy).toHaveBeenCalled();
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(blob);
        expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:url');

        appendSpy.mockRestore();
    });

    test('renders stats cards correctly', () => {
        expect(screen.getByText('5+')).toBeInTheDocument();
        expect(screen.getByText('Experiences')).toBeInTheDocument();
        expect(screen.getByText('20+')).toBeInTheDocument();
        expect(screen.getByText('Projects done')).toBeInTheDocument();
    });

    test('renders profile image with correct attributes and classes', () => {
        const img = screen.getByAltText('Profile');
        expect(img).toHaveAttribute('src', '/images/me.png');
        expect(img).toHaveClass('absolute', 'w-[320px]', 'grayscale');
    });

    test('shows alert when download fails', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
        });

        const alertMock = jest.spyOn(window, 'alert').mockImplementation();

        const downloadBtn = screen.getByText('Download my CV');
        await userEvent.click(downloadBtn);

        await new Promise((r) => setTimeout(r, 0));

        expect(global.fetch).toHaveBeenCalledWith('https://test-api.com/resume');

        expect(alertMock).toHaveBeenCalledWith('Failed to download');

        expect(global.URL.createObjectURL).not.toHaveBeenCalled();
        expect(document.createElement('a').click).not.toHaveBeenCalled();

        alertMock.mockRestore();
    });
});