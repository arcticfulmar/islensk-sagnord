import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { COMMON_PRONOUNS, getDifficultyEmoji } from '../utils/commonData';
import { getVerbById } from '../services/verbService';

function VerbConjugation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [verb, setVerb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    nútið: true,
    þátið: true,
    lþ: true
  });
  
  // Track which conjugations are revealed
  const [revealedConjugations, setRevealedConjugations] = useState({});
  
  // Track random lþ pronoun index
  const [randomLthIndex, setRandomLthIndex] = useState(0);

  useEffect(() => {
    // Scroll to top when component loads or verb changes
    window.scrollTo(0, 0);
    
    getVerbById(id)
      .then(data => {
        setVerb(data);
        // Set random index for lþ pronoun
        setRandomLthIndex(Math.floor(Math.random() * COMMON_PRONOUNS.lþ.length));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleConjugation = (key, tense) => {
    setRevealedConjugations(prev => ({
      ...prev,
      [key]: prev[key] ? undefined : tense
    }));
  };

  const handleRevealAll = () => {
    const revealed = {};
    
    // Reveal all nútið conjugations
    verb.nútið.forEach((item, index) => {
      revealed[`nútið-${index}`] = 'nútið';
    });
    
    // Reveal all þátið conjugations
    verb.þátið.forEach((item, index) => {
      revealed[`þátið-${index}`] = 'þátið';
    });
    
    // Reveal lþ conjugation
    revealed['lþ'] = 'lþ';
    
    setRevealedConjugations(revealed);
    
    // Also expand all sections
    setExpandedSections({
      nútið: true,
      þátið: true,
      lþ: true
    });
  };

  if (loading) return <div className="loading">Hleð...</div>;
  if (error) return <div className="error">Villa: {error}</div>;
  if (!verb) return <div className="error">Sagn fannst ekki</div>;

  return (
    <div className="container">
      <h1 className="page-title">🇮🇸 {verb.íslensku} - {verb.ensku}</h1>
      <p className="page-subtitle">
        {verb.group ? `Group ${verb.group}` : 'Ungrouped'} {getDifficultyEmoji(verb.difficulty, verb.group)}
      </p>
      <p className="page-subtitle" style={{ fontSize: '1.2rem', marginTop: '-20px' }}>
        Conjugation Tables
      </p>
      
      <div className="button-group">
        <button className="btn-primary" onClick={handleRevealAll}>
          Sýna allt!
        </button>
        <button className="btn-success" onClick={() => navigate(`/verb/${id}/practice`)}>
          Æfa mig!
        </button>
        <button className="btn-secondary" onClick={() => navigate('/')}>
          Til baka
        </button>
      </div>

      {/* Nútið Section */}
      <div className="conjugation-section">
        <div 
          className={`section-header ${!expandedSections.nútið ? 'collapsed' : ''}`}
          onClick={() => toggleSection('nútið')}
        >
          <span>⏬ Nútið</span>
          <span className="arrow">▼</span>
        </div>
        {expandedSections.nútið && (
          <div className="conjugation-list">
            {verb.nútið.map((item, index) => {
              const key = `nútið-${index}`;
              return (
                <div key={key} className="conjugation-item">
                  <span className="pronoun">{item.pronoun}</span>
                  <div
                    className={`conjugation-box ${revealedConjugations[key] ? 'revealed' : 'hidden'} ${revealedConjugations[key] === 'nútið' ? 'tense-nutid' : ''}`}
                    onClick={() => toggleConjugation(key, 'nútið')}
                  >
                    {item.conjugation}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Þátið Section */}
      <div className="conjugation-section">
        <div 
          className={`section-header ${!expandedSections.þátið ? 'collapsed' : ''}`}
          onClick={() => toggleSection('þátið')}
        >
          <span>🕐 Þátið</span>
          <span className="arrow">▼</span>
        </div>
        {expandedSections.þátið && (
          <div className="conjugation-list">
            {verb.þátið.map((item, index) => {
              const key = `þátið-${index}`;
              return (
                <div key={key} className="conjugation-item">
                  <span className="pronoun">{item.pronoun}</span>
                  <div
                    className={`conjugation-box ${revealedConjugations[key] ? 'revealed' : 'hidden'} ${revealedConjugations[key] === 'þátið' ? 'tense-thatid' : ''}`}
                    onClick={() => toggleConjugation(key, 'þátið')}
                  >
                    {item.conjugation}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lysingaháttur Þátiðar Section */}
      <div className="conjugation-section">
        <div 
          className={`section-header ${!expandedSections.lþ ? 'collapsed' : ''}`}
          onClick={() => toggleSection('lþ')}
        >
          <span>👍 Lýsingarháttur Þátiðar</span>
          <span className="arrow">▼</span>
        </div>
        {expandedSections.lþ && (
          <div className="conjugation-list">
            <div className="conjugation-item">
              <span className="pronoun">{COMMON_PRONOUNS.lþ[randomLthIndex]}</span>
              <div
                className={`conjugation-box ${revealedConjugations['lþ'] ? 'revealed' : 'hidden'} ${revealedConjugations['lþ'] === 'lþ' ? 'tense-lth' : ''}`}
                onClick={() => toggleConjugation('lþ', 'lþ')}
              >
                {verb.lþ.conjugation}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default VerbConjugation;
