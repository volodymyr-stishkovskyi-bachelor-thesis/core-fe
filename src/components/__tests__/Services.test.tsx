import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { Services } from '../Services';

describe('Services Component', () => {
    beforeEach(() => {
        render(<Services />);
    });

    test('renders the component without crashing', () => {
        expect(screen.getByText('Services')).toBeInTheDocument();
    });

    test('renders the services section with correct id', () => {
        expect(document.getElementById('services')).toBeInTheDocument();
    });

    test('renders the services description paragraph', () => {
        expect(screen.getByText(/Lorem ipsum dolor sit amet consectetur/i)).toBeInTheDocument();
    });

    test('renders all service cards with correct titles', () => {
        expect(screen.getByText('API Development & Integration')).toBeInTheDocument();
        expect(screen.getByText('Database Design & Management')).toBeInTheDocument();
        expect(screen.getByText('Cloud Services Integration')).toBeInTheDocument();
        expect(screen.getByText('Performance Optimization')).toBeInTheDocument();
        expect(screen.getByText('Web Scraping & Data Processing')).toBeInTheDocument();
        expect(screen.getByText('AI & ML Backend Integration')).toBeInTheDocument();
    });

    test('renders all service descriptions', () => {
        expect(screen.getByText(/Building secure REST\/GraphQL API/i)).toBeInTheDocument();
        expect(screen.getByText(/Designing scalable SQL\/NoSQL databases/i)).toBeInTheDocument();
        expect(screen.getByText(/Deploying scalable applications on AWS/i)).toBeInTheDocument();
        expect(screen.getByText(/Optimizing queries, caching data/i)).toBeInTheDocument();
        expect(screen.getByText(/Extracting, parsing, and storing data/i)).toBeInTheDocument();
        expect(screen.getByText(/Integrating AI models/i)).toBeInTheDocument();
    });

    test('renders service icons with proper attributes', () => {
        const icons = screen.getAllByRole('img');
        expect(icons).toHaveLength(6);

        expect(icons[0]).toHaveAttribute('src', '/images/api-svgrepo-com.svg');
        expect(icons[0]).toHaveAttribute('alt', 'API Development & Integration');
        expect(icons[0]).toHaveClass('grayscale');
        expect(icons[0]).toHaveClass('brightness-0');

        expect(icons[1]).toHaveAttribute('src', '/images/database-svgrepo-com.svg');
        expect(icons[1]).toHaveAttribute('alt', 'Database Design & Management');

        expect(icons[2]).toHaveAttribute('src', '/images/aws.svg');
        expect(icons[2]).toHaveAttribute('alt', 'Cloud Services Integration');
    });

    test('has proper responsive grid layout', () => {
        const gridContainer = screen.getByText('Services').closest('div')?.querySelector('.grid');
        expect(gridContainer).toHaveClass('grid', 'gap-8', 'sm:grid-cols-2', 'lg:grid-cols-3');
    });

    test('service cards have proper styling', () => {
        const serviceCards = document.querySelectorAll('.bg-\\[\\#1a1a1a\\]');
        expect(serviceCards.length).toBe(6);

        expect(serviceCards[0]).toHaveClass(
            'bg-[#1a1a1a]',
            'p-6',
            'rounded-lg',
            'hover:bg-[#222222]',
            'transition'
        );
    });
});