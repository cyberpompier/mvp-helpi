{/*
      # Composant TaxiPage (Placeholder)

      Ce fichier est un composant React placeholder pour la page dédiée au service "Taxi".
      Il sera affiché lorsque l'utilisateur naviguera vers `/services/taxi`.

      1. Nouvelle fonctionnalité
        - Affiche un titre et un message indiquant que la page est en construction.
        - Inclut un bouton pour revenir à la page d'accueil.
      2. Composants
        - Utilise `useNavigate` de `react-router-dom` pour la navigation.
        - Utilise le composant `Button` de `@/components/ui/button`.
        - Utilise des classes Tailwind CSS pour le style.
    */}
    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';

    const TaxiPage: React.FC = () => {
      const navigate = useNavigate();

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Service Taxi</h1>
          <p className="text-lg text-gray-300 mb-8 text-center">
            Cette page est en cours de construction. Trouvez votre taxi rapidement et facilement !
          </p>
          <Button onClick={() => navigate('/home')} className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Retour à l'accueil
          </Button>
        </div>
      );
    };

    export default TaxiPage;
