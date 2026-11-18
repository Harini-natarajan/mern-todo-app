import { useState } from "react";
import axios from "axios";

function AIAssistant() {
    const [task, setTask] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleBreakdown = async () => {
        if (!task.trim()) {
            setError("Please enter a task first.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuggestions("");

            const response = await axios.post(
                "http://3.25.113.38/api/ai/breakdown",
                { task }
            );

            setSuggestions(response.data.suggestions);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to generate suggestions. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="ai-assistant">
            <div className="ai-header">
                <div>
                    <span className="section-eyebrow">POWERED BY GEMINI</span>
                    <h2>Taskly AI Assistant ✨</h2>
                    <p>Turn your big goals into smaller, achievable tasks.</p>
                </div>
            </div>

            <div className="ai-input-area">
                <textarea
                    placeholder="Example: Prepare for my Java interview..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />

                <button
                    onClick={handleBreakdown}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "✨ Break Down My Task"}
                </button>
            </div>

            {error && (
                <p className="error-message">{error}</p>
            )}

            {suggestions && (
                <div className="ai-result">
                    <h3>✨ Your Suggested Action Plan</h3>
                    <pre>{suggestions}</pre>
                </div>
            )}
        </section>
    );
}

export default AIAssistant;