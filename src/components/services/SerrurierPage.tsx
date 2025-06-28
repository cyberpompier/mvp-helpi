{/*
      # Composant SerrurierPage (Mise à jour du bouton d'urgence)

      Ce fichier est un composant React pour la page dédiée au service "Serrurier".
      Il permet à l'utilisateur de sélectionner le type d'intervention de serrurerie nécessaire.

      1. Nouvelle fonctionnalité
        - Le bouton "18/112" déclenche désormais un appel téléphonique vers le numéro 18.
      2. Composants
        - Utilise `useNavigate` de `react-router-dom` pour la navigation.
        - Utilise `useState` de React pour gérer l'état de la sélection.
        - Utilise le composant `Button` de `@/components/ui/button`.
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

    const SerrurierPage: React.FC = () => {
      const navigate = useNavigate();
      const [selectedIntervention, setSelectedIntervention] = useState<string | null>(null);

      const handleInterventionChange = (value: string) => {
        setSelectedIntervention(value);
      };

      const handleCallEmergency = () => {
        // Utilise le protocole tel: pour initier un appel téléphonique
        window.location.href = 'tel:18';
      };

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Service Serrurier</h1>
          <p className="text-lg text-gray-300 mb-8 text-center">
            Sélectionnez le type d'intervention dont vous avez besoin :
          </p>

          <div className="w-full max-w-xs mb-8">
            <Select onValueChange={handleInterventionChange} value={selectedIntervention || ''}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez votre intervention" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ouverture_porte">Ouverture de porte</SelectItem>
                <SelectItem value="ouverture_porte_enfants">Ouverture de porte avec enfants/autres</SelectItem>
                <SelectItem value="ouverture_porte_aliments">Ouverture de porte avec aliments sur le feu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedIntervention && (
            <div className="mb-8">
              {selectedIntervention === 'ouverture_porte' && (
                <Button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-md font-bold">
                  Serrurier
                </Button>
              )}
              {(selectedIntervention === 'ouverture_porte_enfants' || selectedIntervention === 'ouverture_porte_aliments') && (
                <Button
                  onClick={handleCallEmergency} // Ajout de l'appel à la fonction d'urgence
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md font-bold"
                >
                  18/112
                </Button>
              )}
            </div>
          )}

          <Button onClick={() => navigate('/home')} className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Retour à l'accueil
          </Button>
        </div>
      );
    };

    export default SerrurierPage;
