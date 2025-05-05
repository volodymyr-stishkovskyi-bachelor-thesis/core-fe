

import React from "react";
import {
    FaLinkedin,
    FaGithub,
    FaGlobe,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#111] text-gray-400 py-8 px-4">
            <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6">
                <h1 className="text-orange-500 text-2xl font-bold">VS</h1>

                <nav className="flex space-x-6 text-sm">
                    <a href="#" className="hover:text-white">
                        Home
                    </a>
                    <a href="#services" className="hover:text-white">
                        Services
                    </a>
                    <a href="#about" className="hover:text-white">
                        About me
                    </a>
                    <a href="#portfolio" className="hover:text-white">
                        Portfolio
                    </a>
                    <a href="#contact" className="hover:text-white">
                        Contact me
                    </a>
                </nav>

                <div className="flex space-x-4 text-xl">
                    <img src="/images/inkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                    <img src="/images/leetcode.svg" alt="Leetcode" className="w-6 h-6" />
                    <img src="/images/github-mark-white.svg" alt="GitHub" className="w-6 h-6" />
                </div>

                <div className="flex items-center space-x-4 text-sm">
                    <a className="flex items-center space-x-1 hover:underline" href="mailto:volodymyr@stishkovskyi.com">
                        <FaEnvelope className="text-base" />
                        <span>volodymyr@stishkovskyi.com</span>
                    </a>
                    <a className="flex items-center space-x-1 hover:underline" href="tel:volodymyr@stishkovskyi.com">
                        <FaPhone className="text-base" />
                        <span>+371 238 869 90</span>
                    </a>
                </div>

                <div className="text-xs text-center text-gray-500">
                    This site respects your privacy and complies with the GDPR. No personal data is collected without your consent.
                </div>
                <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>
            </div>
        </footer>
    );
};
