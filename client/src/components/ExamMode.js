import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { getAllVerbs, getVerbById } from '../services/verbService';

function ExamMode() {
  const navigate = useNavigate();
  const [verbs, setVerbs] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
  const [revealedItems, setRevealedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top when component loads
    window.scrollTo(0, 0);
    
    // Load all verbs with full data
    getAllVerbs()
      .then(async (verbList) => {
        // Load full data for each verb
        const fullVerbsPromises = verbList.map(verb => getVerbById(verb.id));
        const fullVerbs = await Promise.all(fullVerbsPromises);
        setVerbs(fullVerbs);
        generateExam(fullVerbs);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const generateExam = (verbsData) => {
    console.log('Generating exam with verbs:', verbsData.length);
    
    // Shuffle verbs
    const shuffledVerbs = [...verbsData].sort(() => Math.random() - 0.5);
    
    const questions = [];
    
    shuffledVerbs.forEach(verb => {
      console.log('Processing verb:', verb.íslensku, verb);
      
      const verbQuestions = {
        verb: verb,
        questions: []
      };
      
      // Select 2 random pronouns from nútið (with safety checks)
      if (verb.nútið && Array.isArray(verb.nútið)) {
        const nutidPronouns = [...verb.nútið].sort(() => Math.random() - 0.5).slice(0, 2);
        nutidPronouns.forEach(item => {
          if (item && item.examples && Array.isArray(item.examples) && item.examples.length > 0) {
            const randomExample = item.examples[Math.floor(Math.random() * item.examples.length)];
            verbQuestions.questions.push({
              pronoun: item.pronoun,
              conjugation: item.conjugation,
              example: randomExample,
              tense: 'nútið'
            });
          }
        });
      }
      
      // Select 2 random pronouns from þátið (with safety checks)
      if (verb.þátið && Array.isArray(verb.þátið)) {
        const thatidPronouns = [...verb.þátið].sort(() => Math.random() - 0.5).slice(0, 2);
        thatidPronouns.forEach(item => {
          if (item && item.examples && Array.isArray(item.examples) && item.examples.length > 0) {
            const randomExample = item.examples[Math.floor(Math.random() * item.examples.length)];
            verbQuestions.questions.push({
              pronoun: item.pronoun,
              conjugation: item.conjugation,
              example: randomExample,
              tense: 'þátið'
            });
          }
        });
      }
      
      // Add lþ (if it has examples)
      if (verb.lþ && verb.lþ.examples && Array.isArray(verb.lþ.examples) && verb.lþ.examples.length > 0) {
        const randomExample = verb.lþ.examples[Math.floor(Math.random() * verb.lþ.examples.length)];
        verbQuestions.questions.push({
          pronoun: 'l.þ.',
          conjugation: verb.lþ.conjugation,
          example: randomExample,
          tense: 'lþ'
        });
      }
      
      console.log('Verb questions for', verb.íslensku, ':', verbQuestions.questions.length);
      
      // Only add verb if it has questions
      if (verbQuestions.questions.length > 0) {
        questions.push(verbQuestions);
      }
    });
    
    console.log('Total exam questions:', questions.length);
    setExamQuestions(questions);
    setRevealedItems({});
  };

  const handleNewExam = () => {
    if (verbs.length > 0) {
      generateExam(verbs);
    }
  };

  const handleRevealAll = () => {
    const revealed = {};
    examQuestions.forEach((verbQuestion, verbIndex) => {
      verbQuestion.questions.forEach((question, questionIndex) => {
        revealed[`${verbIndex}-${questionIndex}`] = question.tense;
      });
    });
    setRevealedItems(revealed);
  };

  const toggleItem = (verbIndex, questionIndex, tense) => {
    const key = `${verbIndex}-${questionIndex}`;
    setRevealedItems(prev => ({
      ...prev,
      [key]: prev[key] ? undefined : tense
    }));
  };

  const getTenseEmoji = (tense) => {
    if (tense === 'nútið') return '⏬';
    if (tense === 'þátið') return '🕐';
    if (tense === 'lþ') return '👍';
    return '';
  };

  const getTenseLabel = (tense) => {
    if (tense === 'nútið') return 'nútið';
    if (tense === 'þátið') return 'þátið';
    if (tense === 'lþ') return 'l.þ.';
    return '';
  };

  const renderSentenceWithTile = (example, conjugation, verbIndex, questionIndex, tense) => {
    const key = `${verbIndex}-${questionIndex}`;
    const isRevealed = revealedItems[key];
    
    // Split the sentence by [x] and insert the tile
    const parts = example.split('[x]');
    
    return (
      <div className="exam-sentence">
        <span className="exam-emoji">{getTenseEmoji(tense)}</span>
        {parts[0]}
        <span
          className={`conjugation-box ${isRevealed ? `revealed tense-${tense === 'nútið' ? 'nutid' : tense === 'þátið' ? 'thatid' : 'lth'}` : 'hidden'}`}
          onClick={() => toggleItem(verbIndex, questionIndex, tense)}
        >
          {isRevealed ? conjugation : '...'}
        </span>
        {parts[1] || ''}
        <span className="tense-label">({getTenseLabel(tense)})</span>
      </div>
    );
  };

  if (loading) return <div className="loading">Hleð...</div>;
  if (error) return <div className="error">Villa: {error}</div>;

  return (
    <div className="container">
      <h1 className="page-title">🇮🇸 Próf!</h1>
      <p className="page-subtitle">Exam Mode</p>
      
      <div className="button-group">
        <button className="btn-primary" onClick={handleRevealAll}>
          Sýna allt!
        </button>
        <button className="btn-success" onClick={handleNewExam}>
          Nýtt!
        </button>
        <button className="btn-secondary" onClick={() => navigate('/')}>
          Til baka
        </button>
      </div>
      
      {examQuestions.length === 0 ? (
        <div className="loading" style={{ marginTop: '40px' }}>
          No exam questions available. Make sure verb files have example sentences.
        </div>
      ) : (
        <div className="exam-container">
          {examQuestions.map((verbQuestion, verbIndex) => (
            <div key={verbIndex} className="exam-verb-section">
              <h2 className="exam-verb-title">{verbQuestion.verb.íslensku}</h2>
              <div className="exam-questions">
                {verbQuestion.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="exam-question">
                    {renderSentenceWithTile(
                      question.example,
                      question.conjugation,
                      verbIndex,
                      questionIndex,
                      question.tense
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default ExamMode;
