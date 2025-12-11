import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { getDifficultyEmoji } from '../utils/commonData';
import { getAllVerbs } from '../services/verbService';

function Overview() {
  const [verbs, setVerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllVerbs()
      .then(data => {
        setVerbs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleVerbClick = (verbId) => {
    navigate(`/verb/${verbId}`);
  };

  if (loading) return <div className="loading">Hleð...</div>;
  if (error) return <div className="error">Villa: {error}</div>;

  return (
    <div className="container">
      <h1 className="page-title">🇮🇸 Íslensk sagnorð</h1>
      <p className="page-subtitle">Icelandic Verbs</p>
      
      <div className="verb-grid">
        {verbs.map(verb => (
          <div 
            key={verb.id}
            className="verb-tile"
            onClick={() => handleVerbClick(verb.id)}
          >
            <div className="verb-tile-title">{verb.íslensku}</div>
            <div className="verb-tile-translation">{verb.ensku}</div>
            <div className="verb-tile-info">
              {verb.group ? `Group ${verb.group}` : 'Ungrouped'}
              <span className="difficulty-emoji">
                {getDifficultyEmoji(verb.difficulty, verb.group)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Overview;
