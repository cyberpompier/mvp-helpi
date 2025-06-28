{/*
      # Composant DatabaseTestPage

      Ce fichier contient le composant React pour une page de test de connexion à la base de données.
      Il inclut un bouton pour la géolocalisation et affiche les coordonnées obtenues.

      1. Nouvelle fonctionnalité
        - Ajout d'un bouton "Me géolocaliser" qui utilise l'API Geolocation du navigateur.
        - Affichage des coordonnées (latitude et longitude) dans la section "Vos sélections".
        - Gestion des erreurs et des messages d'état pour la géolocalisation (chargement, erreur, non supporté).
      2. Composants
        - Utilise `useState` pour gérer l'état des coordonnées et des messages.
        - Utilise des classes Tailwind CSS pour le style et la mise en page.
        - Intègre le composant `Button` de shadcn/ui.
      3. Changements
        - Création de la structure de base de la page avec un titre, une section pour le bouton de géolocalisation,
          et une section "Vos sélections" pour afficher les données.
        - Ajout d'un placeholder pour le bouton "choisir un fichier" comme demandé.
        - **Suppression du `console.log` de débogage.**
    */}
    import React, { useState } from 'react'; // Supprimez useEffect car le console.log est retiré
    import { Button } from '@/components/ui/button';

    const DatabaseTestPage: React.FC = () => {
      const [latitude, setLatitude] = useState<number | null>(null);
      const [longitude, setLongitude] = useState<number | null>(null);
      const [locationError, setLocationError] = useState<string | null>(null);
      const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);

      const handleGeolocate = () => {
        if (!navigator.geolocation) {
          setLocationError("La géolocalisation n'est pas supportée par votre navigateur.");
          return;
        }

        setIsLoadingLocation(true);
        setLocationError(null);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setIsLoadingLocation(false);
          },
          (error) => {
            setIsLoadingLocation(false);
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setLocationError("Vous avez refusé la demande de géolocalisation.");
                break;
              case error.POSITION_UNAVAILABLE:
                setLocationError("Les informations de localisation ne sont pas disponibles.");
                break;
              case error.TIMEOUT:
                setLocationError("La demande de géolocalisation a expiré.");
                break;
              default:
                setLocationError("Une erreur inconnue est survenue lors de la géolocalisation.");
                break;
            }
            setLatitude(null);
            setLongitude(null);
          }
        );
      };

      return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Page de Test de Base de Données</h1>

          {/* Section pour le bouton "choisir un fichier" (placeholder) */}
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Gestion des Fichiers</h2>
            <p className="text-gray-300 mb-4">
              Cette section est un placeholder pour la fonctionnalité de sélection de fichier.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Choisir un fichier (Placeholder)
            </Button>
          </div>

          {/* Section pour le bouton "Me géolocaliser" */}
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Géolocalisation</h2>
            <p className="text-gray-300 mb-4">
              Cliquez sur le bouton ci-dessous pour obtenir votre position actuelle.
            </p>
            <Button
              onClick={handleGeolocate}
              disabled={isLoadingLocation}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoadingLocation ? 'Chargement...' : 'Me géolocaliser'}
            </Button>
            {locationError && (
              <p className="text-red-500 mt-4 text-center">{locationError}</p>
            )}
          </div>

          {/* Section "Vos sélections" pour afficher les données */}
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Vos Sélections</h2>
            {latitude !== null && longitude !== null ? (
              <div className="text-gray-300">
                <p><strong>Latitude:</strong> {latitude}</p>
                <p><strong>Longitude:</strong> {longitude}</p>
              </div>
            ) : (
              <p className="text-gray-400">
                Aucune donnée de géolocalisation disponible. Cliquez sur "Me géolocaliser" pour obtenir votre position.
              </p>
            )}
          </div>
        </div>
      );
    };

    export default DatabaseTestPage;
