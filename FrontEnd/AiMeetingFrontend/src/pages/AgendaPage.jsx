import React, { useState } from "react";
import { agenda } from "../services/aiApiService";

export default function AgendaPage() {
    const [form, setForm] = useState({ topic: '', duration: '', goals: '' });
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult('');

        try {
            const output = await agenda(form);
            setResult(output);
        } catch (error) {
            setError(error.message || 'kunde inte sammanfatta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <h2>Skapa Mötes agenda</h2>
            <form onSubmit={handleSubmit}>
                <input
                    rows={6}
                    placeholder="skriv mötesämne"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    required
                />
                <input
                    placeholder="längd på mötet"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    required
                />
                <textarea
                    rows={3}
                    placeholder="Mål och syfte till mötet"
                    value={form.goals}
                    onChange={(e) => setForm({ ...form, goals: e.target.value })}
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