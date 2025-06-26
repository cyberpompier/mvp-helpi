{/*
      # Composant LandingPage

      Ce fichier contient le composant React pour la page d'atterrissage animée.
      Il gère l'animation des portes coulissantes et l'affichage du logo central.

      1. Nouvelle fonctionnalité
        - Implémentation d'une animation de double porte coulissante.
        - Affichage d'un logo central qui agit comme un "verrou" pendant 5 secondes.
        - Transition vers le contenu principal de l'application après l'animation.
      2. Composants
        - Utilise `useState` et `useEffect` de React pour gérer l'état de l'animation et les délais.
        - Utilise des classes Tailwind CSS pour le style et les transitions.
    */}
    import React, { useState, useEffect } from 'react';

    interface LandingPageProps {
      onAnimationComplete: () => void;
    }

    const LandingPage: React.FC<LandingPageProps> = ({ onAnimationComplete }) => {
      const [doorsOpen, setDoorsOpen] = useState(false);
      const [logoVisible, setLogoVisible] = useState(true);
      const [animationStarted, setAnimationStarted] = useState(false);

      useEffect(() => {
        // Démarre l'animation après un court délai pour s'assurer que le composant est monté
        const startTimer = setTimeout(() => {
          setAnimationStarted(true);
        }, 100); // Petit délai pour le rendu initial

        // Le logo reste visible pendant 5 secondes
        const logoTimer = setTimeout(() => {
          setLogoVisible(false); // Cache le logo
          setDoorsOpen(true); // Déclenche l'ouverture des portes
        }, 5000);

        // Une fois les portes ouvertes, l'animation est complète
        const completeTimer = setTimeout(() => {
          onAnimationComplete();
        }, 6500); // 5000ms (logo) + 1500ms (transition des portes)

        return () => {
          clearTimeout(startTimer);
          clearTimeout(logoTimer);
          clearTimeout(completeTimer);
        };
      }, [onAnimationComplete]);

      return (
        <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {/* Porte gauche */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-gray-800 transform transition-transform duration-1500 ease-in-out ${
              doorsOpen ? '-translate-x-full' : 'translate-x-0'
            }`}
          ></div>

          {/* Porte droite */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-gray-800 transform transition-transform duration-1500 ease-in-out ${
              doorsOpen ? 'translate-x-full' : 'translate-x-0'
            }`}
          ></div>

          {/* Logo central */}
          <div
            className={`absolute z-10 transition-opacity duration-500 ${
              logoVisible && animationStarted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src="/logo.png" alt="Logo" className="w-32 h-32 animate-pulse" />
          </div>
        </div>
      );
    };

    export default LandingPage;
