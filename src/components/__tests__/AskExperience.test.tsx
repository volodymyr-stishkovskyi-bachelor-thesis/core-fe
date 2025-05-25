import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { AskExperience } from '../AskExperience';

global.fetch = jest.fn();

Element.prototype.scrollIntoView = jest.fn();

describe('AskExperience Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (global.fetch as jest.Mock).mockResolvedValue({
            json: () => Promise.resolve({ response: 'Test response from the AI' })
        });
    });

    test('renders the component without crashing', () => {
        render(<AskExperience />);
        expect(screen.getByText('Ask about my experience!')).toBeInTheDocument();
    });

    test('renders the ask section with correct id', () => {
        render(<AskExperience />);
        expect(document.getElementById('ask')).toBeInTheDocument();
    });

    test('displays initial bot welcome message', () => {
        render(<AskExperience />);
        expect(screen.getByText("Hi! I'm here to answer your questions about my experience. Feel free to ask anything!")).toBeInTheDocument();
    });

    test('allows user to input and send a message', async () => {
        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'What is your experience?' } });
        fireEvent.click(sendButton);

        expect(screen.getByText('What is your experience?')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Test response from the AI')).toBeInTheDocument();
        });
    });

    test('sends message when Enter key is pressed', async () => {
        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');

        fireEvent.change(input, { target: { value: 'Tell me about yourself' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(screen.getByText('Tell me about yourself')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Test response from the AI')).toBeInTheDocument();
        });
    });

    test('handles API error gracefully', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'This will fail' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('Error reaching the server. Please try again later.')).toBeInTheDocument();
        });
    });

    test('processes quoted string responses correctly', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ response: '"This is a quoted response"' })
        });

        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'Give me a quoted response' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('This is a quoted response')).toBeInTheDocument();
        });
    });

    test('disables send button when loading', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            new Promise(resolve => setTimeout(() =>
                resolve({ json: () => Promise.resolve({ response: 'Delayed response' }) }),
                100
            ))
        );

        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'Slow response' } });
        fireEvent.click(sendButton);

        expect(sendButton).toBeDisabled();
        expect(sendButton).toHaveTextContent('...');

        await waitFor(() => {
            expect(screen.getByText('Delayed response')).toBeInTheDocument();
            expect(sendButton).not.toBeDisabled();
            expect(sendButton).toHaveTextContent('Send');
        });
    });

    test('prevents duplicate welcome messages on re-render', () => {
        const { rerender } = render(<AskExperience />);

        expect(screen.getAllByText("Hi! I'm here to answer your questions about my experience. Feel free to ask anything!").length).toBe(1);

        rerender(<AskExperience />);

        expect(screen.getAllByText("Hi! I'm here to answer your questions about my experience. Feel free to ask anything!").length).toBe(1);
    });

    test('scrolls header into view when messages change', async () => {
        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'Test message' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
        });
    });

    test('does not send empty messages', async () => {
        render(<AskExperience />);

        const sendButton = screen.getByRole('button', { name: 'Send' });
        fireEvent.click(sendButton);

        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('shows loading animation when waiting for response', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            new Promise(resolve => setTimeout(() =>
                resolve({ json: () => Promise.resolve({ response: 'Delayed response' }) }),
                100
            ))
        );

        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'Slow response' } });
        fireEvent.click(sendButton);

        const loadingDots = document.querySelectorAll('.bg-blue-500.rounded-full.animate-bounce');
        expect(loadingDots.length).toBe(3);

        await waitFor(() => {
            expect(screen.getByText('Delayed response')).toBeInTheDocument();
        });
    });

    test('handles null API response with fallback message', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ response: null })
        });

        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'What happens with null?' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('Sorry, no response.')).toBeInTheDocument();
        });
    });

    test('handles empty string API response with fallback message', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ response: '' })
        });

        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'Empty response test' } });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(screen.getByText('Sorry, no response.')).toBeInTheDocument();
        });
    });

    test('Enter with shift key does not send message', () => {
        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        fireEvent.change(input, { target: { value: 'This should not send' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', shiftKey: true });

        expect(global.fetch).not.toHaveBeenCalled();
        expect(screen.queryByText('This should not send')).not.toBeInTheDocument();
    });

    test('does not send message when input is only whitespace', () => {
        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(sendButton);

        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('does not send message when already loading', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            new Promise(resolve => setTimeout(() =>
                resolve({ json: () => Promise.resolve({ response: 'Delayed response' }) }),
                100
            ))
        );

        render(<AskExperience />);

        const input = screen.getByPlaceholderText('Ask me anything...');
        const sendButton = screen.getByRole('button', { name: 'Send' });

        fireEvent.change(input, { target: { value: 'First message' } });
        fireEvent.click(sendButton);

        fireEvent.change(input, { target: { value: 'Second message' } });
        fireEvent.click(sendButton);

        expect(global.fetch).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(screen.getByText('Delayed response')).toBeInTheDocument();
        });
    });
});