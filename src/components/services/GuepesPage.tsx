{/*
      # Composant GuepesPage

      Ce fichier contient le composant React pour la page dédiée au service "Guepes".
      Cette mise à jour ajoute une liste de choix pour différents nuisibles (guêpes, frelons, etc.)
      et affiche une image correspondante à la sélection.

      1. Nouvelle fonctionnalité
        - Ajout d'une liste déroulante (`Select`) pour choisir le type de nuisible.
        - Affichage dynamique d'une image basée sur la sélection de la liste déroulante.
        - Bouton de retour pour naviguer vers la page d'accueil.
      2. Composants
        - Utilise `useNavigate` de `react-router-dom` pour la navigation.
        - Utilise `useState` de React pour gérer l'état de la sélection et de l'image.
        - Utilise les composants `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` de `@/components/ui/select`.
        - Utilise des classes Tailwind CSS pour le style.
    */}
    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from '@/components/ui/select';

    const GuepesPage: React.FC = () => {
      const navigate = useNavigate();
      const [selectedNuisible, setSelectedNuisible] = useState<string>('guepes');

      const nuisibleImages: { [key: string]: string } = {
        guepes: 'https://i.postimg.cc/9QwL4rmh/guepes.jpg',
        frelons: 'https://i.postimg.cc/nLP7q10S/frelon.jpg', // Placeholder URL
        frelons_asiatiques: 'https://i.postimg.cc/zfSSWh49/frelon-asiatique.jpg', // Placeholder URL
        abeilles: 'https://i.postimg.cc/tT3fs7zT/abeille.jpg', // Placeholder URL
        bourdons: 'https://i.postimg.cc/Px5ZwRWw/bourdon.jpg', // Placeholder URL
      };

      const handleSelectChange = (value: string) => {
        setSelectedNuisible(value);
      };

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Destruction de Nuisibles</h1>
          <p className="text-lg text-gray-300 mb-8 text-center">
            Sélectionnez le type de nuisible pour plus d'informations :
          </p>

          <div className="w-full max-w-xs mb-8">
            <Select onValueChange={handleSelectChange} defaultValue={selectedNuisible}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez un nuisible" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guepes">Guêpes</SelectItem>
                <SelectItem value="frelons">Frelons</SelectItem>
                <SelectItem value="frelons_asiatiques">Frelons Asiatiques</SelectItem>
                <SelectItem value="abeilles">Abeilles</SelectItem>
                <SelectItem value="bourdons">Bourdons</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedNuisible && (
            <div className="mb-8 text-center">
              <img
                src={nuisibleImages[selectedNuisible]}
                alt={`Image de ${selectedNuisible}`}
                className="w-full max-w-md rounded-lg shadow-lg mb-4"
              />
              <p className="text-xl font-semibold capitalize">{selectedNuisible}</p>
              <p className="text-md text-gray-400 mt-2">
                Informations détaillées sur la destruction et la prévention des {selectedNuisible}.
              </p>
            </div>
          )}

          <Button onClick={() => navigate('/home')} className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Retour à l'accueil
          </Button>
        </div>
      );
    };

    export default GuepesPage;
