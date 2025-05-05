"use client";

import React, { useState } from "react";
import { Footer } from "./Footer";

export const ContactForm: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        timeline: "",
        details: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted", form);
    };

    return (
        <section id="contact" className="py-16 px-4 max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-2">Contact me</h2>
            <p className="text-center text-gray-400 mb-8">Cultivating Connections: Reach Out And Connect With Me</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-3 rounded-md bg-[#111] border border-gray-700 text-white"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="p-3 rounded-md bg-[#111] border border-gray-700 text-white"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="p-3 rounded-md bg-[#111] border border-gray-700 text-white"
                />
                <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="p-3 rounded-md bg-[#111] border border-gray-700 text-white"
                >
                    <option value="">Service Of Interest</option>
                    <option value="api">API Integration</option>
                    <option value="database">Database Design</option>
                    <option value="cloud">Cloud Setup</option>
                    <option value="ml">AI/ML Backend</option>
                </select>
                <input
                    type="text"
                    name="timeline"
                    placeholder="Timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className="p-3 rounded-md bg-[#111] border border-gray-700 text-white col-span-1 md:col-span-1"
                />
                <textarea
                    name="details"
                    placeholder="Project Details..."
                    value={form.details}
                    onChange={handleChange}
                    className="p-3 rounded-md bg-[#111] border border-gray-700 text-white col-span-1 md:col-span-1"
                />

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-md bg-orange-500 text-white hover:bg-gray-500 transition"
                    >
                        Send
                    </button>
                </div>
            </form>
        </section>
    );
};
