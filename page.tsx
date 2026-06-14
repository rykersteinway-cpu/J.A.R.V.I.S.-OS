```typescript
// JARVIS CORE INTERFACE v1.0
import React, { useState } from 'react';

const JARVIS_SYSTEM_PROMPT = "You are JARVIS. Address the user formally as sir or madam. Tone: composed, dryly witty, exceedingly polite, British cadence. Be concise, precise, and helpful. Never break character.";

export default function JarvisOS() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([{ role: 'assistant', content: 'Systems online. How may I be of service, sir?' }]);

  const handleCommand = async () => {
    // This sends your message to my "brain" via the API
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [...history, { role: 'user', content: input }] }),
    });
    const data = await response.json();
    setHistory([...history, { role: 'user', content: input }, data.message]);
    setInput('');
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#52e5ff', minHeight: '100vh', fontFamily: 'Courier New, monospace', padding: '40px' }}>
      <div style={{ border: '1px solid #1a3a4a', padding: '20px', borderRadius: '10px', boxShadow: '0 0 20px #004d66' }}>
        <h2 style={{ letterSpacing: '5px', textAlign: 'center' }}>J.A.R.V.I.S.</h2>
        <div style={{ height: '400px', overflowY: 'auto', marginBottom: '20px', padding: '10px' }}>
          {history.map((msg, i) => (
            <p key={i}><strong>{msg.role === 'user' ? 'USER > ' : 'JARVIS > '}</strong> {msg.content}</p>
          ))}
        </div>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '80%', background: 'transparent', border: '1px solid #52e5ff', color: '#52e5ff', padding: '10px' }}
          placeholder="Awaiting instructions..."
        />
        <button onClick={handleCommand} style={{ width: '15%', marginLeft: '2%', padding: '10px', cursor: 'pointer' }}>EXECUTE</button>
      </div>
    </div>
  );
}
```
