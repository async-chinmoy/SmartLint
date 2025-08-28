"use client";

import { useRef, useState } from "react";
import { Bot, FileCode2, Info, CheckCircle2, AlertTriangle, Brain, TextQuote } from "lucide-react";

const CodeAnalyser = () => {
    const textareaRef = useRef(null);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const code = textareaRef.current?.value;
        if (!code) return alert("Please paste your code.");

        setLoading(true);
        setAnalysis(null);
        setError(null);

        try {
            const response = await fetch("/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status}\n${errorText}`);
            }

            const data = await response.json();
            setAnalysis(data.review);
        } catch (error) {
            console.error("Error analyzing code:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const Section = ({ title, icon: Icon, children }) => (
        <div className="mb-4">
            <div className="flex items-center gap-2 text-blue-300 font-medium mb-1">
                <Icon className="w-4 h-4" />
                <h3>{title}</h3>
            </div>
            <div className="pl-6 text-gray-300 text-sm">{children}</div>
        </div>
    );

 
    const renderListOrString = (data, fallbackMessage) => {
        if (Array.isArray(data) && data.length > 0) {
            return (
                <ul className="list-disc list-inside space-y-1">
                    {data.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            );
        } else if (typeof data === "string" && data.trim() !== "") {
            return <p>{data}</p>;
        } else {
            return <p>{fallbackMessage}</p>;
        }
    };

    return (
        <div>
            <section className="flex justify-center items-start gap-6 px-10 py-10 border-t border-gray-800">
               {/* left side panel */}
                <div className="bg-[#161b22] p-6 rounded-xl shadow-md w-3/5 h-fit">
                    <div className="flex items-center gap-2 mb-4 text-blue-400">
                        <FileCode2 className="w-5 h-5" />
                        <h2 className="text-lg font-semibold">Paste your code</h2>
                    </div>
                    <textarea
                        ref={textareaRef}
                        className="w-full h-64 bg-[#0d1117] text-sm text-gray-100 p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Paste your code here..."
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-4 px-5 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg font-medium transition"
                    >
                        {loading ? "Analyzing..." : "Analyze with AI"}
                    </button>
                </div>

                {/* Right side panel */}
                <div className="bg-[#161b22] p-6 rounded-xl shadow-md w-2/5 h-fit max-h-[30rem] overflow-y-auto">
                    <div className="flex items-center gap-2 mb-4 text-blue-400">
                        <Bot className="w-5 h-5" />
                        <h2 className="text-lg font-semibold">AI Suggestions</h2>
                    </div>

                    {loading && (
                        <p className="text-gray-400 italic pl-4">Analyzing your code...</p>
                    )}

                    {!loading && error && (
                        <p className="text-red-400 pl-4">Error: {error}</p>
                    )}

                    {!loading && analysis && (
                        <div className="space-y-4">
                            <Section title="Description" icon={Info}>
                                <p>{analysis.description || "No description provided."}</p>
                            </Section>

                            <Section title="Complexity" icon={Brain}>
                                <p>{analysis.complexity || "Complexity not determined."}</p>
                            </Section>

                            <Section title="Accuracy" icon={CheckCircle2}>
                                <p>{analysis.accuracy || "Accuracy not provided."}</p>
                            </Section>

                            <Section title="Style Suggestions" icon={TextQuote}>
                                {renderListOrString(
                                    analysis.styleSuggestions,
                                    "No style suggestions."
                                )}
                            </Section>

                            <Section title="Grammar Issues" icon={AlertTriangle}>
                                {renderListOrString(
                                    analysis.grammarIssues,
                                    "No grammar issues found."
                                )}
                            </Section>
                        </div>
                    )}

                    {!loading && !analysis && !error && (
                        <p className="italic text-gray-400 pl-4">
                            AI suggestions and analysis will appear here.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CodeAnalyser;
