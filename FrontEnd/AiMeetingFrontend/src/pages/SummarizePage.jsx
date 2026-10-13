import React, { useState } from "react";
import { summarize } from "../services/aiApiService";

export default function summarizePage() {
    const [notes, setNotes] = useState('');
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult('');

        try {
            const output = await summarize(notes);
            setResult(output);
        } catch (error) {
            setError(error.message || 'kunde inte sammanfatta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <h2>Sammanfattning för mötes anteckningar</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows={6}
                    placeholder="skriv dina anteckningar"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Laddar...' : 'Sammanfatta'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {result && <pre className="result">{result}</pre>}
        </div>
    );
}