"use client";

import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Message {
    sender: "user" | "bot";
    content: string;
}

const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:5566";

export const AskExperience: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLHeadingElement | null>(null);
    const mounted = useRef(false);
    const chatIdRef = useRef<string>(uuidv4());

    useEffect(() => {
        if (!mounted.current) {
            setMessages([
                {
                    sender: "bot",
                    content: "Hi! I'm here to answer your questions about my experience. Feel free to ask anything!",
                },
            ]);
            mounted.current = true;
        }
    }, []);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch(`${apiHost}/queries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: input,
                    chat: chatIdRef.current,
                }),
            });

            const { response: data } = await res.json();

            let processedData = data;
            if (typeof data === 'string') {
                if (data.startsWith('"') && data.endsWith('"')) {
                    processedData = data.slice(1, -1);
                }
            }

            const response: Message = {
                sender: "bot",
                content: processedData || "Sorry, no response.",
            };

            setMessages((prev) => [...prev, response]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    content: "Error reaching the server. Please try again later.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    useEffect(() => {
        if (headerRef.current && messages.length > 1) {
            headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [messages]);

    return (
        <section id="ask" className="py-16 px-4 max-w-4xl mx-auto">
            <h2 ref={headerRef} className="text-2xl font-semibold text-center mb-6">
                Ask about my experience!
            </h2>

            <div className="bg-[#1a1a1a] rounded-xl p-6 h-[400px] overflow-y-auto mb-4 space-y-2 custom-scrollbar">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`relative break-words whitespace-pre-wrap px-4 py-2 max-w-[80%] w-fit text-sm ${msg.sender === "user"
                            ? "bg-green-800 text-green-200 self-end ml-auto rounded-xl rounded-br-none"
                            : "bg-blue-900 text-blue-200 self-start rounded-xl rounded-bl-none"
                            }`}
                    >
                        {msg.content}
                        <div
                            className={`absolute w-0 h-0 border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent ${msg.sender === "user"
                                ? "border-t-[10px] border-t-green-800 bottom-0 right-2"
                                : "border-t-[10px] border-t-blue-900 bottom-0 left-2"
                                }`}
                        ></div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-1 ml-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0ms]" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:150ms]" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            <div className="flex items-center gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="flex-1 p-2 rounded-md bg-[#111] border border-gray-700 text-sm text-white"
                />
                <button
                    onClick={sendMessage}
                    disabled={isLoading}
                    className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
                >
                    {isLoading ? "..." : "Send"}
                </button>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 3px;
        }
      `}</style>
        </section>
    );
};
