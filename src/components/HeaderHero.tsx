"use client";
import React, { useState } from 'react';
import { Menu, X } from "lucide-react"

export const HeaderHero: React.FC = () => {
    const handleDownload = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/resume`);
        if (!res.ok) return alert("Failed to download");

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "volodymyr-cv.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    };
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section id="home" className="bg-[#111111] text-white">
            {/* Header */}
            <header className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between py-6 px-6">
                <div className="text-2xl font-bold text-orange-500">VS</div>

                {/* Hamburger button - visible only on mobile */}
                <button
                    className="sm:hidden text-orange-500 mt-4 sm:mt-0"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Nav links */}
                <nav
                    className={`flex-col items-center text-center space-y-4 sm:space-y-0 sm:space-x-10 sm:flex-row sm:flex ${isOpen ? "flex mt-4" : "hidden"
                        }`}
                >
                    <a href="#home" className="text-orange-500 hover:text-white">Home</a>
                    <a href="#services" className="text-gray-400 hover:text-white">Services</a>
                    <a href="#about" className="text-gray-400 hover:text-white">About me</a>
                    <a href="#contact" className="text-gray-400 hover:text-white">Contact me</a>
                </nav>
            </header>

            {/* Hero */}
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center px-6 py-16">
                {/* Left content */}
                <div className="space-y-4">
                    <p className="text-gray-400 text-lg">Hi I am</p>
                    <h2 className="text-3xl md:text-4xl font-medium text-gray-300">Volodymyr Stishkovskyi</h2>
                    <h1 className="text-5xl md:text-6xl font-bold text-orange-500">Backend Developer</h1>

                    <div className="flex items-center space-x-4">
                        {/* Social icons placeholders */}
                        <img src="/images/inkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                        <img src="/images/leetcode.svg" alt="Leetcode" className="w-6 h-6" />
                        <img src="/images/github-mark-white.svg" alt="GitHub" className="w-6 h-6" />
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <a className="bg-orange-500 text-black font-medium px-6 py-3 rounded-lg hover:bg-orange-600 transition" href="#contact">
                            Hire Me
                        </a>
                        <button onClick={handleDownload} className="cursor-pointer border border-gray-400 text-gray-300 font-medium px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                            Download my CV
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-10 grid grid-cols-2 gap-4 max-w-sm">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                            <p className="text-orange-500 text-xl font-bold">5+</p>
                            <p className="text-gray-400">Experiences</p>
                        </div>
                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                            <p className="text-orange-500 text-xl font-bold">20+</p>
                            <p className="text-gray-400">Projects done</p>
                        </div>
                    </div>
                </div>

                {/* Right image with circle background */}
                <div className="relative flex justify-center items-center">
                    {/* Фоновый круг */}
                    <div className="w-80 h-80 rounded-full bg-[#222222] z-10" />

                    {/* Фото поверх круга и выходит за него */}
                    <img
                        src="/images/me.png"
                        alt="Profile"
                        className="absolute w-[320px] object-cover grayscale z-20 -bottom-8"
                        style={{ maskImage: 'none', WebkitMaskImage: 'none' }}
                    />
                </div>
            </div>
        </section>
    );
};
