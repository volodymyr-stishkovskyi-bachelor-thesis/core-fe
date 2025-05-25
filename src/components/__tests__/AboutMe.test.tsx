import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { AboutMe } from '../AboutMe';

jest.mock('../LeetCodeRings', () => {
    const React = require('react');
    return {
        LeetCodeRings: () =>
            React.createElement(
                'div',
                { 'data-testid': 'leetcode-rings' },
                'LeetCode Rings Mock'
            ),
    };
});

describe('AboutMe Component', () => {
    beforeEach(() => {
        render(<AboutMe />);
    });

    test('renders the component without crashing', () => {
        expect(screen.getByText('About Me')).toBeInTheDocument();
    });

    test('renders the about section with correct id', () => {
        expect(document.getElementById('about')).toBeInTheDocument();
    });

    test('renders the about text paragraph', () => {
        expect(screen.getByText(/A software engineer, the modern-day architect/i)).toBeInTheDocument();
    });

    test('renders the Download CV button', () => {
        expect(screen.getByRole('button', { name: /Download CV/i })).toBeInTheDocument();
    });

    test('renders the skills section with all skills', () => {
        const skills = ['Node.js', 'Nest.js', 'SQL', 'Golang', 'AWS'];

        skills.forEach(skill => {
            expect(screen.getByText(skill)).toBeInTheDocument();
        });
    });

    test('renders skill icons with proper attributes', () => {
        const skillIcons = screen.getAllByRole('img');
        expect(skillIcons).toHaveLength(5);

        expect(skillIcons[0]).toHaveAttribute('src', '/images/nodejs-logo-svgrepo-com.svg');
        expect(skillIcons[0]).toHaveAttribute('alt', 'Node.js');
        expect(skillIcons[0]).toHaveClass('grayscale');
    });

    test('renders the Leetcode Progress section', () => {
        expect(screen.getByText('Leetcode Progress')).toBeInTheDocument();
        expect(screen.getByTestId('leetcode-rings')).toBeInTheDocument();
    });

    test('has proper responsive classes for layout', () => {
        const mainContainer = screen.getByText('About Me').closest('div')?.parentElement;
        expect(mainContainer).toHaveClass('max-w-6xl', 'mx-auto', 'flex', 'flex-col', 'lg:flex-row');
    });
});