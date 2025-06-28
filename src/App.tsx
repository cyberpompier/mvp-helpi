{/*
      # Composant App (Rétablissement du routage original)

      Ce fichier est le composant racine de l'application.
      Après avoir confirmé que `SerrurierPage` fonctionne seule,
      nous rétablissons le routage original pour que l'application
      démarre avec le `LandingPageWrapper`.

      1. Changements
        - La route racine (`/`) pointe de nouveau vers `LandingPageWrapper`.
        - Les autres routes restent inchangées.
    */}
    import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import LandingPageWrapper from './components/LandingPageWrapper';
    import HomePage from './components/HomePage';
    import GuepesPage from './components/services/GuepesPage';
    import SerrurierPage from './components/services/SerrurierPage';
    import TaxiPage from './components/services/TaxiPage';
    import DatabaseTestPage from './components/DatabaseTestPage';

    const App: React.FC = () => {
      return (
        <Router>
          <Routes>
            {/* Rétablissement de la route principale vers LandingPageWrapper */}
            <Route path="/" element={<LandingPageWrapper />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/services/guepes" element={<GuepesPage />} />
            <Route path="/services/serrurier" element={<SerrurierPage />} />
            <Route path="/services/taxi" element={<TaxiPage />} />
            <Route path="/test-db" element={<DatabaseTestPage />} />
          </Routes>
        </Router>
      );
    };

    export default App;
