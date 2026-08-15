import React, { useEffect, useState } from 'react';

const API_URL = '/api/bmi';

function App() {
  const [form, setForm] = useState({ name: '', height: '', weight: '' });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadHistory(); }, []);
  async function loadHistory() {
    try { const response = await fetch(API_URL); if (response.ok) setHistory(await response.json()); } catch { /* API may not be started yet */ }
  }
  function change(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  async function calculate(event) {
    event.preventDefault(); setMessage(''); setLoading(true);
    try {
      const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setResult(data); setHistory([data, ...history].slice(0, 10));
    } catch (error) { setMessage(error.message || 'Could not reach the server.'); }
    finally { setLoading(false); }
  }
  const tone = result?.category === 'Healthy weight' ? 'good' : result?.category === 'Underweight' ? 'low' : 'high';
  return <main className="page">
    <section className="card">
      <div className="intro"><span className="eyebrow">HEALTH TOOL</span><h1>Know your <em>balance.</em></h1><p>A simple body mass index calculator for everyday health awareness.</p></div>
      <form onSubmit={calculate}>
        <label>Name <span>(optional)</span><input name="name" value={form.name} onChange={change} placeholder="Your name" maxLength="50" /></label>
        <div className="fields"><label>Height <input name="height" type="number" value={form.height} onChange={change} placeholder="e.g. 170" min="1" step="0.1" required /><small>centimetres</small></label><label>Weight <input name="weight" type="number" value={form.weight} onChange={change} placeholder="e.g. 65" min="1" step="0.1" required /><small>kilograms</small></label></div>
        <button disabled={loading}>{loading ? 'Calculating…' : 'Calculate BMI'} <span>→</span></button>
      </form>
      {message && <p className="message">{message}</p>}
      {result && <section className={`result ${tone}`} aria-live="polite"><p>Your BMI</p><strong>{result.bmi}</strong><div><b>{result.category}</b><span>{result.category === 'Healthy weight' ? 'Your BMI is in the healthy range.' : 'BMI is a screening measure, not a diagnosis.'}</span></div></section>}
    </section>
    <section className="guide"><h2>BMI guide</h2><div><p><i className="lowDot" />Underweight <span>Below 18.5</span></p><p><i className="goodDot" />Healthy weight <span>18.5 – 24.9</span></p><p><i className="highDot" />Overweight <span>25.0 – 29.9</span></p><p><i className="highDot" />Obesity <span>30.0 and above</span></p></div>{history.length > 0 && <aside><h2>Recent calculations</h2>{history.slice(0, 5).map(item => <p key={item._id}><b>{item.name}</b><span>{item.bmi} · {item.category}</span></p>)}</aside>}</section>
  </main>;
}
export default App;
