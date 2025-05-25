import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LeetCodeRings } from '../LeetCodeRings';

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    easy: 1,
                    medium: 2,
                    hard: 3,
                    totalEasy: 4,
                    totalMedium: 5,
                    totalHard: 6,
                }),
        })
    ) as jest.Mock;

    class MockIntersectionObserver {
        callback: IntersectionObserverCallback;
        constructor(cb: IntersectionObserverCallback) {
            this.callback = cb;
        }
        observe () {
            const mockObserver = {
                root: null,
                rootMargin: '0px',
                thresholds: [0],
                takeRecords: () => [],
                observe: () => { },
                disconnect: () => { },
                unobserve: () => { }
            } as IntersectionObserver;

            this.callback([{ isIntersecting: true } as IntersectionObserverEntry], mockObserver);
        }
        disconnect () { }
        unobserve () { }
    }
    // @ts-ignore
    window.IntersectionObserver = MockIntersectionObserver;
});

describe('LeetCodeRings Component', () => {
    test('fetches data and displays solved total and individual stats', async () => {
        const { container } = render(<LeetCodeRings />);

        expect(global.fetch).toHaveBeenCalledWith('/api/leetcode');

        const total = await screen.findByText('6');
        expect(total).toBeInTheDocument();

        const easyStat = screen.getByText(/Easy/).closest('div');
        const mediumStat = screen.getByText(/Medium/).closest('div');
        const hardStat = screen.getByText(/Hard/).closest('div');

        expect(easyStat).toHaveTextContent('Easy1/4');
        expect(mediumStat).toHaveTextContent('Medium2/5');
        expect(hardStat).toHaveTextContent('Hard3/6');

        const progressCircles = container.querySelectorAll('circle[stroke-linecap="round"]');
        expect(progressCircles.length).toBe(3);

        const radius = 200;
        const circumference = 2 * Math.PI * radius;
        const expectedOffsets = [
            circumference * (1 - 1 / 4),
            circumference * (1 - 2 / 5),
            circumference * (1 - 3 / 6),
        ];

        progressCircles.forEach((circle, idx) => {
            const offset = parseFloat(circle.getAttribute('stroke-dashoffset')!);
            expect(offset).toBeCloseTo(expectedOffsets[idx], 1);
        });
    });
    test('renders the SVG and outer container with the correct classes', () => {
        const { container } = render(<LeetCodeRings />);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();

        const wrapper = container.querySelector('div.w-full.max-w-md.mx-auto.rounded-xl.p-6');
        expect(wrapper).toBeInTheDocument();
    });

    test('animation is triggered when element is intersecting', async () => {
        const { container } = render(<LeetCodeRings />);

        await waitFor(() => {
            const circles = container.querySelectorAll('circle[stroke-linecap="round"]');
            const easyCircle = circles[0];

            expect(easyCircle).toHaveClass('transition-all');
            expect(easyCircle).toHaveClass('duration-1000');

            const strokeDashoffset = easyCircle.getAttribute('stroke-dashoffset');
            expect(parseFloat(strokeDashoffset!)).not.toBe(2 * Math.PI * 200);
        });
    });

    test('observer disconnect is called on unmount', () => {
        const disconnectMock = jest.fn();
        const observeMock = jest.fn();

        // @ts-ignore 
        window.IntersectionObserver = jest.fn(() => ({
            observe: observeMock,
            disconnect: disconnectMock,
            unobserve: jest.fn(),
        }));

        const { unmount } = render(<LeetCodeRings />);

        expect(observeMock).toHaveBeenCalled();

        unmount();

        expect(disconnectMock).toHaveBeenCalled();
    });

    test('animation is not triggered when element is not intersecting', async () => {
        // @ts-ignore
        window.IntersectionObserver = class {
            callback: IntersectionObserverCallback;
            constructor(cb: IntersectionObserverCallback) {
                this.callback = cb;
            }
            observe () {
                const mockObserver = {
                    root: null,
                    rootMargin: '0px',
                    thresholds: [0],
                    takeRecords: () => [],
                    observe: () => { },
                    disconnect: () => { },
                    unobserve: () => { }
                } as IntersectionObserver;

                this.callback([{ isIntersecting: false } as IntersectionObserverEntry], mockObserver);
            }
            disconnect () { }
            unobserve () { }
        };

        const { container } = render(<LeetCodeRings />);

        await new Promise(r => setTimeout(r, 100));

        const circles = container.querySelectorAll('circle[stroke-linecap="round"]');

        circles.forEach(circle => {
            const radius = 200;
            const circumference = 2 * Math.PI * radius;
            expect(parseFloat(circle.getAttribute('stroke-dashoffset')!)).toBe(circumference);
        });
    });
});