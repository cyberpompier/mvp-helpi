{/*
      # Composant App

      Ce fichier est le composant racine de l'application.
      Il gère l'affichage conditionnel de la page d'atterrissage et de la page d'accueil
      en utilisant `react-router-dom` pour la navigation.

      1. Nouvelle fonctionnalité
        - Intégration de `react-router-dom` pour la gestion des routes.
        - Affichage de `LandingPage` au démarrage, puis redirection vers `HomePage` après l'animation.
        - Ajout de routes spécifiques pour les services (Guêpes, Serrurier, Taxi).
      2. Composants
        - Utilise `BrowserRouter`, `Routes`, et `Route` de `react-router-dom`.
        - Gère l'état `showLanding` pour contrôler l'affichage de la page d'atterrissage.
      3. Changements
        - Ajout d'un léger délai (`setTimeout`) avant la navigation vers `/home`
          pour permettre à la `LandingPage` de se démonter complètement et éviter les conflits DOM.
        - Importation et ajout des nouveaux composants de page de service aux routes.
    */}
    import React, { useState } from 'react';
    import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
    import LandingPage from './components/LandingPage';
    import HomePage from './components/HomePage';
    import GuepesPage from './components/services/GuepesPage';
    import SerrurierPage from './components/services/SerrurierPage';
    import TaxiPage from './components/services/TaxiPage';

    // Composant Wrapper pour gérer la logique de la LandingPage et la redirection
    const LandingPageWrapper: React.FC = () => {
      const navigate = useNavigate();
      const [showLanding, setShowLanding] = useState(true);

      const handleAnimationComplete = () => {
        setShowLanding(false); // Déclenche le démontage de LandingPage
        // Ajoute un léger délai pour s'assurer que le démontage est terminé avant la navigation
        setTimeout(() => {
          navigate('/home'); // Redirige vers la page d'accueil
        }, 50); // Délai de 50ms
      };

      return showLanding ? (
        <LandingPage onAnimationComplete={handleAnimationComplete} />
      ) : null;
    };

    const App: React.FC = () => {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPageWrapper />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/services/guepes" element={<GuepesPage />} />
            <Route path="/services/serrurier" element={<SerrurierPage />} />
            <Route path="/services/taxi" element={<TaxiPage />} />
          </Routes>
        </Router>
      );
    };

    export default App;
