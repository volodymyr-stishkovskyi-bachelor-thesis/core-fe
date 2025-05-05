"use client";
import React, { useEffect, useRef, useState } from "react";

interface RingData {
    easy: number;
    medium: number;
    hard: number;
    totalEasy: number;
    totalMedium: number;
    totalHard: number;
}

export const LeetCodeRings: React.FC = () => {
    const [data, setData] = useState<RingData>({
        easy: 0,
        medium: 0,
        hard: 0,
        totalEasy: 1,
        totalMedium: 1,
        totalHard: 1,
    });

    const [animate, setAnimate] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/api/leetcode")
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setAnimate(true);
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const radius = 200;
    const stroke = 24;
    const spacing = 50;
    const circumference = 2 * Math.PI * radius;

    const getDash = (value: number, total: number) => (circumference * value) / total;

    return (
        <div
            ref={ref}
            className="w-full max-w-md mx-auto rounded-xl p-6"
        >
            <div className="relative w-full flex justify-center items-center">
                <svg width="400" height="400" viewBox="0 0 480 480" className="rotate-[-135deg]">
                    {/* Easy */}
                    <g className="transition-transform hover:scale-[1.03] origin-center">
                        <circle
                            cx="240"
                            cy="240"
                            r={radius}
                            stroke="#22c55e"
                            strokeWidth={stroke}
                            fill="transparent"
                            opacity={0.2}
                        />
                        <circle
                            cx="240"
                            cy="240"
                            r={radius}
                            stroke="#22c55e"
                            strokeWidth={stroke}
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={animate ? circumference - getDash(data.easy, data.totalEasy) : circumference}
                            className="transition-all duration-1000"
                        />
                    </g>

                    {/* Medium */}
                    <g className="transition-transform hover:scale-[1.03] origin-center">
                        <circle
                            cx="240"
                            cy="240"
                            r={radius - spacing}
                            stroke="#f97316"
                            strokeWidth={stroke}
                            fill="transparent"
                            opacity={0.2}
                        />
                        <circle
                            cx="240"
                            cy="240"
                            r={radius - spacing}
                            stroke="#f97316"
                            strokeWidth={stroke}
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={animate ? circumference - getDash(data.medium, data.totalMedium) : circumference}
                            className="transition-all duration-1000 delay-200"
                        />
                    </g>

                    {/* Hard */}
                    <g className="transition-transform hover:scale-[1.03] origin-center">
                        <circle
                            cx="240"
                            cy="240"
                            r={radius - spacing * 2}
                            stroke="#ef4444"
                            strokeWidth={stroke}
                            fill="transparent"
                            opacity={0.2}
                        />
                        <circle
                            cx="240"
                            cy="240"
                            r={radius - spacing * 2}
                            stroke="#ef4444"
                            strokeWidth={stroke}
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={animate ? circumference - getDash(data.hard, data.totalHard) : circumference}
                            className="transition-all duration-1000 delay-400"
                        />
                    </g>
                </svg>

                {/* Label */}
                <div className="absolute text-center">
                    <p className="text-3xl font-bold text-white">{data.easy + data.medium + data.hard}</p>
                    <p className="text-sm text-white">Solved</p>
                </div>
            </div>

            {/* Stats */}

            <div className="mt-6 bg-[#1a1a1a] rounded-lg p-4 flex justify-between text-sm text-gray-200 font-medium">
                <div className="text-green-400 text-center">
                    Easy<br />{data.easy}/{data.totalEasy}
                </div>
                <div className="text-orange-400 text-center">
                    Medium<br />{data.medium}/{data.totalMedium}
                </div>
                <div className="text-red-400 text-center">
                    Hard<br />{data.hard}/{data.totalHard}
                </div>
            </div>
        </div>

    );
};