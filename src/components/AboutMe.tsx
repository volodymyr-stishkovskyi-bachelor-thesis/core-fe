import React from 'react';
import { LeetCodeRings } from './LeetCodeRings';

const skills = [
    { name: 'Node.js', icon: '/images/nodejs-logo-svgrepo-com.svg' },
    { name: 'Nest.js', icon: '/images/nestjs-svgrepo-com.svg' },
    { name: 'SQL', icon: '/images/sql-file-format-svgrepo-com.svg' },
    { name: 'Golang', icon: '/images/go-svgrepo-com.svg' },
    { name: 'AWS', icon: '/images/aws.svg' },
];

export const AboutMe: React.FC = () => (
    <section id="about" className="bg-[#111111] text-white py-16 ">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row px-4">

            {/* Right content */}
            <div className="w-full lg:w-1/2 lg:pl-12">
                <h2 className="text-3xl font-semibold mb-4 text-center">About Me</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                    A software engineer, the modern-day architect of digital realms, navigates the ethereal landscapes of code, sculpting intangible structures that shape our technological world. With fingers poised over keyboards like virtuoso pianists, they compose symphonies of logic, their minds a labyrinth of algorithms and solutions.Their canvas is a screen, a vast expanse where lines of code dance in intricate patterns, weaving the fabric of programs and applications. Each keystroke is a brushstroke, crafting intricate architectures and breathing life into innovative designs.In this digital atelier, they don the mantle of problem solvers, confronting bugs and glitches like valiant knights in an ever-evolving quest for perfection. Debugging becomes a noble pursuit, unraveling the mysteries hidden within the tangled webs of code. designs.In this digital atelier.
                </p>
                <button className="flex items-center bg-orange-500 text-black font-medium px-6 py-3 rounded-lg hover:bg-orange-600 transition mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Download CV
                </button>

                {/* Skills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 bg-[#1a1a1a] rounded-lg p-4">
                    {skills.map((skill) => (
                        <div key={skill.name} className="flex flex-col items-center">
                            <div className="relative w-24 h-24 mb-2">
                                <svg className="w-full h-full">
                                </svg>
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="absolute inset-0 w-12 h-12 m-auto grayscale brightness-0"
                                />
                            </div>
                            <p className="text-gray-400 text-sm">{skill.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Left image */}
            <div className="w-full lg:w-1/2 lg:pl-12 pt-8 lg:pt-0 xl:pt-0">
                <h2 className="text-3xl font-semibold mb-4 text-center">Leetcode Progress</h2>
                <LeetCodeRings />
            </div>
        </div>
    </section>
);
