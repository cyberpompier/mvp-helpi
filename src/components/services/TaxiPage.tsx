{/*
      # Composant TaxiPage

      Ce fichier contient le composant React pour la page dédiée au service "Taxi".
      C'est une page simple qui affiche un titre et un bouton de retour.

      1. Nouvelle fonctionnalité
        - Page dédiée pour le service "Taxi".
        - Bouton de retour pour naviguer vers la page d'accueil.
      2. Composants
        - Utilise `useNavigate` de `react-router-dom` pour la navigation.
        - Utilise des classes Tailwind CSS pour le style.
    */}
    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';

    const TaxiPage: React.FC = () => {
      const navigate = useNavigate();

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Service : Taxi</h1>
          <p className="text-lg text-gray-300 mb-8 text-center">
            Informations sur la réservation de taxis, les tarifs et les zones desservies.
          </p>
          <img src="/taxi.JPEG" alt="Image de taxi" className="w-full max-w-md rounded-lg shadow-lg mb-8" />
          <Button onClick={() => navigate('/home')} className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Retour à l'accueil
          </Button>
        </div>
      );
    };

    export default TaxiPage;
