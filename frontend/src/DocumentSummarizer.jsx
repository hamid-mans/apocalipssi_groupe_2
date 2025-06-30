import React, { useState } from 'react';
import axios from 'axios';
import './DocumentSummarizer.css';

export default function DocumentSummarizer() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', file);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/summarize`, formData);
      setSummary(res.data);
    } catch (error) {
      console.error('Erreur lors du traitement', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="document-summarizer">
      <h1>Assistant de Synthèse de Documents</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Analyser</button>
      {loading && <p className="loading">Analyse en cours...</p>}
      {summary && (
        <div className="summary-box">
          <h2>Résumé :</h2>
          <pre>{summary.summary}</pre>
        </div>
      )}
    </div>
  );
}
