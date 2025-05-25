import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { Footer } from '../Footer';

describe('Footer Component', () => {
    beforeEach(() => {
        render(<Footer />);
    });

    test('renders the component without crashing', () => {
        expect(screen.getByText('VS')).toBeInTheDocument();
    });

    test('renders the navigation links', () => {
        const navLinks = ['Home', 'Services', 'About me', 'Portfolio', 'Contact me'];

        navLinks.forEach(link => {
            expect(screen.getByText(link)).toBeInTheDocument();
        });
    });

    test('renders social media icons with proper attributes', () => {
        const socialIcons = screen.getAllByRole('img');
        expect(socialIcons).toHaveLength(3);

        expect(socialIcons[0]).toHaveAttribute('src', '/images/inkedin.svg');
        expect(socialIcons[0]).toHaveAttribute('alt', 'LinkedIn');
        expect(socialIcons[0]).toHaveClass('w-6', 'h-6');

        expect(socialIcons[1]).toHaveAttribute('src', '/images/leetcode.svg');
        expect(socialIcons[1]).toHaveAttribute('alt', 'Leetcode');

        expect(socialIcons[2]).toHaveAttribute('src', '/images/github-mark-white.svg');
        expect(socialIcons[2]).toHaveAttribute('alt', 'GitHub');
    });

    test('renders contact information correctly', () => {
        expect(screen.getByText('volodymyr@stishkovskyi.com')).toBeInTheDocument();
        expect(screen.getByText('+371 238 869 90')).toBeInTheDocument();
    });

    test('renders privacy notice and link', () => {
        expect(screen.getByText(/This site respects your privacy and complies with the GDPR/i)).toBeInTheDocument();
        const privacyLink = screen.getByText('Privacy Policy');
        expect(privacyLink).toBeInTheDocument();
        expect(privacyLink).toHaveAttribute('href', '/privacy');
    });

    test('has proper responsive classes for layout', () => {
        const mainContainer = screen.getByText('VS').closest('div');
        expect(mainContainer).toHaveClass('max-w-5xl', 'mx-auto', 'flex', 'flex-col', 'items-center', 'space-y-6');
    });

    test('email link has correct mailto attribute', () => {
        const emailLink = screen.getByText('volodymyr@stishkovskyi.com').closest('a');
        expect(emailLink).toHaveAttribute('href', 'mailto:volodymyr@stishkovskyi.com');
    });

    test('phone link has correct tel attribute', () => {
        const phoneLink = screen.getByText('+371 238 869 90').closest('a');
        expect(phoneLink).toHaveAttribute('href', 'tel:volodymyr@stishkovskyi.com');
    });
});