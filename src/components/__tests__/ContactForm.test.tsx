import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ContactForm } from '../ContactForm';

describe('ContactForm Component', () => {
    beforeEach(() => {
        render(<ContactForm />);
    });

    test('renders the contact section with correct id and headings', () => {
        const section = document.getElementById('contact');
        expect(section).toBeInTheDocument();

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Contact me');
        expect(
            screen.getByText(/Cultivating Connections: Reach Out And Connect With Me/i)
        ).toBeInTheDocument();
    });

    test('renders all form fields with initial empty values', () => {
        expect(screen.getByPlaceholderText('Name')).toHaveValue('');
        expect(screen.getByPlaceholderText('Email')).toHaveValue('');
        expect(screen.getByPlaceholderText('Phone Number')).toHaveValue('');
        expect(screen.getByRole('combobox')).toHaveValue('');
        expect(screen.getByPlaceholderText('Timeline')).toHaveValue('');
        expect(screen.getByPlaceholderText('Project Details...')).toHaveValue('');
    });

    test('allows user to type into each input and select service', async () => {
        const user = userEvent.setup();

        const nameInput = screen.getByPlaceholderText('Name');
        const emailInput = screen.getByPlaceholderText('Email');
        const phoneInput = screen.getByPlaceholderText('Phone Number');
        const serviceSelect = screen.getByRole('combobox');
        const timelineInput = screen.getByPlaceholderText('Timeline');
        const detailsTextarea = screen.getByPlaceholderText('Project Details...');

        await user.type(nameInput, 'Alice');
        await user.type(emailInput, 'alice@example.com');
        await user.type(phoneInput, '1234567890');
        await user.selectOptions(serviceSelect, 'api');
        await user.type(timelineInput, '2 weeks');
        await user.type(detailsTextarea, 'Build an API integration');

        expect(nameInput).toHaveValue('Alice');
        expect(emailInput).toHaveValue('alice@example.com');
        expect(phoneInput).toHaveValue('1234567890');
        expect(serviceSelect).toHaveValue('api');
        expect(timelineInput).toHaveValue('2 weeks');
        expect(detailsTextarea).toHaveValue('Build an API integration');
    });

    test('submits the form and calls console.log with form data', async () => {
        const user = userEvent.setup();
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        await user.type(screen.getByPlaceholderText('Name'), 'Bob');
        await user.type(screen.getByPlaceholderText('Email'), 'bob@example.com');
        await user.type(screen.getByPlaceholderText('Phone Number'), '0987654321');
        await user.selectOptions(screen.getByRole('combobox'), 'database');
        await user.type(screen.getByPlaceholderText('Timeline'), '1 month');
        await user.type(screen.getByPlaceholderText('Project Details...'), 'Design a DB');

        await user.click(screen.getByRole('button', { name: /Send/i }));

        expect(consoleSpy).toHaveBeenCalledWith('Submitted', {
            name: 'Bob',
            email: 'bob@example.com',
            phone: '0987654321',
            service: 'database',
            timeline: '1 month',
            details: 'Design a DB',
        });

        consoleSpy.mockRestore();
    });

    test('Send button has correct type and styling classes', () => {
        const button = screen.getByRole('button', { name: /Send/i });
        expect(button).toHaveAttribute('type', 'submit');
        expect(button).toHaveClass(
            'px-6',
            'py-2',
            'rounded-md',
            'bg-orange-500',
            'text-white',
            'hover:bg-gray-500',
            'transition'
        );
    });
});