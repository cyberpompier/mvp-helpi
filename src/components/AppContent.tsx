{/*
      # Composant AppContent

      Ce fichier contient un composant React simple qui sert de placeholder
      pour le contenu principal de votre application. Il sera affiché une fois
      l'animation de la `LandingPage` terminée.

      1. Nouvelle fonctionnalité
        - Affiche un message de bienvenue et un lien vers la page de test de la base de données.
      2. Composants
        - Utilise `Link` de `react-router-dom` pour la navigation.
        - Utilise des classes Tailwind CSS pour un style de base.
    */}
    import React from 'react';
    import { Link } from 'react-router-dom';

    const AppContent: React.FC = () => {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Bienvenue sur Helpi !
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center max-w-2xl">
            Votre plateforme de services d'urgence et de proximité.
            Explorez nos fonctionnalités ou testez la connexion à la base de données.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/home"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Aller à l'accueil
            </Link>
            <Link
              to="/test-db"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Tester la BDD
            </Link>
          </div>
          <div className="mt-12 text-gray-500 text-sm">
            <p>&copy; 2024 Helpi. Tous droits réservés.</p>
          </div>
        </div>
      );
    };

    export default AppContent;
