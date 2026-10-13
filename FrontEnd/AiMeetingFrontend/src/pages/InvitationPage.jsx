import React, { useState } from 'react';
import { Invitation } from '../services/aiApiService';

export default function InvitationPage() {
    const [form, setForm] = useState({ title: '', dateAndTime: '', location: '', purpose: '' });
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult('');

        try {
            const output = await Invitation(form);
            setResult(output);
        } catch (error) {
            setError(error.message || 'kunde inte skapa inbjudan')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='page'>
            <h2>Skapa MötesInbjudan</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='mötestitel'
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <input
                    placeholder='tid och datum'
                    value={form.dateAndTime}
                    onChange={(e) => setForm({ ...form, dateAndTime: e.target.value })}
                    required
                />
                <input
                    placeholder='Mötets plats'
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                />
                <textarea
                    rows={3}
                    placeholder='syfte'
                    value={form.purpose}
                    onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Laddar...' : 'Skapa inbjudan'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {result && <pre className="result">{result}</pre>}
        </div>
    )
}
