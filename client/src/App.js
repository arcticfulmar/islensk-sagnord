import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from './components/Overview';
import VerbConjugation from './components/VerbConjugation';
import VerbPractice from './components/VerbPractice';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/verb/:id" element={<VerbConjugation />} />
          <Route path="/verb/:id/practice" element={<VerbPractice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
