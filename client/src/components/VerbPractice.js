import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { COMMON_PRONOUNS, getDifficultyEmoji } from '../utils/commonData';
import { getVerbById } from '../services/verbService';

function VerbPractice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [verb, setVerb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [practiceItems, setPracticeItems] = useState([]);
  const [revealedItems, setRevealedItems] = useState({});
  const [tenseFilter, setTenseFilter] = useState('random');

  useEffect(() => {
    // Scroll to top when component loads or verb changes
    window.scrollTo(0, 0);
    
    getVerbById(id)
      .then(data => {
        setVerb(data);
        generatePracticeItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const generatePracticeItems = (verbData, filter = 'random') => {
    const items = [];
    
    // Add items based on filter
    if (filter === 'random' || filter === 'nútið') {
      // Add items from nútið
      verbData.nútið.forEach(item => {
        items.push({
          pronoun: item.pronoun,
          conjugation: item.conjugation,
          tense: 'nútið',
          tenseShort: 'nútið'
        });
      });
    }
    
    if (filter === 'random' || filter === 'þátið') {
      // Add items from þátið
      verbData.þátið.forEach(item => {
        items.push({
          pronoun: item.pronoun,
          conjugation: item.conjugation,
          tense: 'þátið',
          tenseShort: 'þátið'
        });
      });
    }
    
    if (filter === 'random') {
      // Add items from lþ
      COMMON_PRONOUNS.lþ.forEach(pronoun => {
        items.push({
          pronoun: pronoun,
          conjugation: verbData.lþ.conjugation,
          tense: 'lysingaháttur þátiðar',
          tenseShort: 'l.þ.'
        });
      });
    }
    
    // Shuffle and select random subset (8-12 items for random, all items for filtered)
    const shuffled = items.sort(() => Math.random() - 0.5);
    const count = filter === 'random' 
      ? Math.min(Math.max(8, Math.floor(Math.random() * 5) + 8), shuffled.length)
      : shuffled.length;
    const selected = shuffled.slice(0, count);
    
    setPracticeItems(selected);
    setRevealedItems({});
  };

  const toggleItem = (index, tense) => {
    setRevealedItems(prev => ({
      ...prev,
      [index]: prev[index] ? undefined : tense
    }));
  };

  const handleNewPractice = () => {
    if (verb) {
      generatePracticeItems(verb, tenseFilter);
    }
  };

  const handleFilterChange = (filter) => {
    setTenseFilter(filter);
    if (verb) {
      generatePracticeItems(verb, filter);
    }
  };

  const handleRevealAll = () => {
    const revealed = {};
    practiceItems.forEach((item, index) => {
      revealed[index] = item.tense;
    });
    setRevealedItems(revealed);
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
        Practice Mode
      </p>
      
      <div className="button-group">
        <button className="btn-primary" onClick={handleRevealAll}>
          Sýna allt!
        </button>
        <button className="btn-success" onClick={handleNewPractice}>
          Nýtt!
        </button>
        <button className="btn-secondary" onClick={() => navigate(`/verb/${id}`)}>
          Til baka
        </button>
      </div>

      <div className="button-group" style={{ marginTop: '-15px' }}>
        <button 
          className={`btn-filter ${tenseFilter === 'nútið' ? 'active' : ''}`}
          onClick={() => handleFilterChange('nútið')}
        >
          ⏬ Bara nútið
        </button>
        <button 
          className={`btn-filter ${tenseFilter === 'þátið' ? 'active' : ''}`}
          onClick={() => handleFilterChange('þátið')}
        >
          🕐 Bara þátið
        </button>
        <button 
          className={`btn-filter ${tenseFilter === 'random' ? 'active' : ''}`}
          onClick={() => handleFilterChange('random')}
        >
          🔀 Blönduð
        </button>
      </div>

      <div className="conjugation-section">
        <div className="conjugation-list">
          {practiceItems.map((item, index) => {
            const tenseClass = item.tense === 'nútið' ? 'tense-nutid' : 
                              item.tense === 'þátið' ? 'tense-thatid' : 'tense-lth';
            const tenseEmoji = item.tense === 'nútið' ? '⏬' : 
                              item.tense === 'þátið' ? '🕐' : '👍';
            return (
              <div key={index} className="conjugation-item">
                <span className="pronoun">
                  {tenseEmoji} {item.pronoun}
                  <span className="tense-label">({item.tenseShort})</span>
                </span>
                <div
                  className={`conjugation-box ${revealedItems[index] ? 'revealed' : 'hidden'} ${revealedItems[index] ? tenseClass : ''}`}
                  onClick={() => toggleItem(index, item.tense)}
                >
                  {item.conjugation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VerbPractice;
