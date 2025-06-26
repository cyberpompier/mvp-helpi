{/*
      # Composant SerrurierPage

      Ce fichier contient le composant React pour la page dédiée au service "Serrurier".
      Cette mise à jour ajoute une liste de choix pour différents scénarios de serrurerie.

      1. Nouvelle fonctionnalité
        - Page dédiée pour le service "Serrurier".
        - Ajout d'une liste déroulante (`Select`) pour choisir le type d'intervention.
        - Affichage de l'option sélectionnée.
        - Bouton de retour pour naviguer vers la page d'accueil.
      2. Composants
        - Utilise `useNavigate` de `react-router-dom` pour la navigation.
        - Utilise `useState` de React pour gérer l'état de la sélection.
        - Utilise les composants `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` de `@/components/ui/select`.
        - Utilise des classes Tailwind CSS pour le style.
      3. Correction
        - Ajout de la prop `value` au composant `Select` pour le rendre contrôlé,
          permettant ainsi à `SelectValue` d'afficher correctement l'option sélectionnée.
        - Mise à jour du texte de l'option "Ouverture de porte" pour afficher "appeler un serrurier"
          dans le `Select` et dans le résumé de l'option sélectionnée.
        - Remplacement du texte "appeler un serrurier" par un bouton "Serrurier" lorsque l'option "Ouverture de porte" est sélectionnée.
        - Remplacement des commentaires pour les autres options par un bouton rouge "Appeler le 18 / 112".
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
      const [selectedOption, setSelectedOption] = useState<string | null>(null);

      const handleSelectChange = (value: string) => {
        setSelectedOption(value);
      };

      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Service : Serrurier</h1>
          <p className="text-lg text-gray-300 mb-8 text-center">
            Informations sur nos services de serrurerie, dépannage d'urgence et installation.
          </p>
          <img src="https://i.postimg.cc/8zsK6nC6/serrurier.jpg" alt="Image de serrurier" className="w-full max-w-md rounded-lg shadow-lg mb-8" />

          <div className="w-full max-w-xs mb-8">
            <Select onValueChange={handleSelectChange} value={selectedOption || undefined}>
              <SelectTrigger className="w-full">
                {/* Affiche le texte de l'option sélectionnée ou le placeholder */}
                <SelectValue placeholder="Sélectionnez le type d'intervention" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ouverture_porte">Ouverture de porte</SelectItem>
                {/* Option pour une ouverture de porte avec présence d'enfants ou autres personnes */}
                <SelectItem value="ouverture_porte_enfants">Ouverture de porte avec enfant/autres</SelectItem>
                {/* Option pour une ouverture de porte en cas d'urgence (aliment sur le feu) */}
                <SelectItem value="ouverture_porte_aliment">Ouverture de porte avec aliment sur le feu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedOption && (
            <div className="mb-8 text-center">
              <p className="text-xl font-semibold">Option sélectionnée :</p>
              <p className="text-lg text-gray-300">
                {selectedOption === 'ouverture_porte' && (
                  <Button
                    onClick={() => console.log('Bouton Serrurier cliqué !')}
                    className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                  >
                    Serrurier
                  </Button>
                )}
                {(selectedOption === 'ouverture_porte_enfants' || selectedOption === 'ouverture_porte_aliment') && (
                  <Button
                    onClick={() => {
                      console.log('Appel au 18 / 112 simulé !');
                      window.location.href = 'tel:18'; // Tente de composer le numéro sur les appareils mobiles
                    }}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                  >
                    Appeler le 18 / 112
                  </Button>
                )}
              </p>
            </div>
          )}

          <Button onClick={() => navigate('/home')} className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Retour à l'accueil
          </Button>
        </div>
      );
    };

    export default SerrurierPage;
