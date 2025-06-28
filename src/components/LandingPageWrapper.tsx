{/*
      # Composant LandingPageWrapper

      Ce fichier contient le composant React `LandingPageWrapper`.
      Son rôle est de gérer l'affichage conditionnel de la `LandingPage` (avec son animation)
      et du contenu principal de l'application (`AppContent`).

      1. Nouvelle fonctionnalité
        - Gère un état `showLandingPage` pour contrôler quelle partie de l'interface est visible.
        - Affiche la `LandingPage` tant que l'animation n'est pas terminée.
        - Une fois l'animation terminée (via `onAnimationComplete`), bascule vers `AppContent`.
      2. Composants
        - Utilise `useState` pour gérer l'état.
        - Importe et utilise `LandingPage` et `AppContent`.
    */}
    import React, { useState } from 'react';
    import LandingPage from './LandingPage';
    import AppContent from './AppContent'; // Le composant qui contient le reste de votre application

    const LandingPageWrapper: React.FC = () => {
      const [showLandingPage, setShowLandingPage] = useState(true);

      const handleAnimationComplete = () => {
        setShowLandingPage(false);
      };

      return (
        <>
          {showLandingPage ? (
            <LandingPage onAnimationComplete={handleAnimationComplete} />
          ) : (
            <AppContent />
          )}
        </>
      );
    };

    export default LandingPageWrapper;
