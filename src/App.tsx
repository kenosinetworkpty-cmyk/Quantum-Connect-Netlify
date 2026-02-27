import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../components/Home';
import { Terms } from '../components/Terms';
import { Privacy } from '../components/Privacy';
import { AUP } from '../components/AUP';
import { PAIA } from '../components/PAIA';
import { Support } from '../components/Support';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/aup" element={<AUP />} />
        <Route path="/paia" element={<PAIA />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
