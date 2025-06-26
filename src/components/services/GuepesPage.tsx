{/*
      # Composant GuepesPage

      Ce fichier contient le composant React pour la page dédiée au service "Guepes".
      Cette mise à jour ajoute une liste de choix pour différents nuisibles (guêpes, frelons, etc.)
      et affiche une image correspondante à la sélection, ainsi que des informations détaillées
      spécifiques à chaque type de nuisible.

      1. Nouvelle fonctionnalité
        - Ajout d'une liste déroulante (`Select`) pour choisir le type de nuisible.
        - Affichage dynamique d'une image basée sur la sélection de la liste déroulante.
        - Affichage de descriptions détaillées et spécifiques pour chaque nuisible sélectionné.
        - Ajout d'une section "Information à donner" et "Consignes de sécurités".
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

    interface NuisibleInfo {
      title: string;
      description: string;
      image: string;
    }

    const GuepesPage: React.FC = () => {
      const navigate = useNavigate();
      const [selectedNuisible, setSelectedNuisible] = useState<string>('guepes');

      const nuisibleData: { [key: string]: NuisibleInfo } = {
        guepes: {
          title: 'Guêpes Communes',
          description: 'Les guêpes communes construisent leurs nids dans des endroits abrités comme les greniers, les cavités murales ou sous terre. Elles sont attirées par la nourriture sucrée et les protéines, et peuvent devenir agressives si leur nid est menacé. La destruction de leur nid doit être effectuée par des professionnels pour éviter les piqûres multiples.',
          image: 'https://i.postimg.cc/9QwL4rmh/guepes.jpg', // Image pour les guêpes communes
        },
        frelons: {
          title: 'Frelons Européens',
          description: 'Les frelons européens sont plus grands que les guêpes et construisent souvent leurs nids dans des arbres creux, des cheminées ou des abris de jardin. Bien qu\'impressants, ils sont généralement moins agressifs que les guêpes, sauf s\'ils se sentent menacés. Leurs piqûres sont douloureuses mais rarement dangereuses, sauf en cas d\'allergie.',
          image: 'https://i.postimg.cc/nLP7q10S/frelon.jpg', // Image pour les frelons européens
        },
        frelons_asiatiques: {
          title: 'Frelons Asiatiques',
          description: 'Le frelon asiatique est une espèce invasive qui représente une menace sérieuse pour les abeilles et la biodiversité. Leurs nids, souvent sphériques et de grande taille, sont construits en hauteur dans les arbres ou sous les toits. Il est crucial de signaler et de faire détruire ces nids par des spécialistes, car ils sont très défensifs et leurs piqûres peuvent être dangereuses.',
          image: 'https://i.postimg.cc/zfSSWh49/frelon-asiatique.jpg', // Image pour les frelons asiatiques
        },
        abeilles: {
          title: 'Abeilles',
          description: 'Les abeilles sont des pollinisateurs essentiels et sont protégées. Nous privilégions le déplacement des essaims plutôt que leur destruction. Si vous avez un essaim d\'abeilles, contactez-nous pour une intervention respectueuse de l\'environnement, visant à relocaliser la colonie en toute sécurité.',
          image: 'https://i.postimg.cc/tT3fs7zT/abeille.jpg', // Image pour les abeilles
        },
        bourdons: {
          title: 'Bourdons',
          description: 'Les bourdons sont de grands insectes velus, également d\'excellents pollinisateurs. Ils construisent leurs nids généralement sous terre, dans des cavités ou des tas de compost. Ils sont très peu agressifs et ne piquent que s\'ils sont directement menacés. Comme les abeilles, nous favorisons leur déplacement plutôt que leur éradication.',
          image: 'https://i.postimg.cc/Px5ZwRWw/bourdon.jpg', // Image pour les bourdons
        },
      };

      const currentNuisible = nuisibleData[selectedNuisible];

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

          {currentNuisible && (
            <div className="mb-8 text-center max-w-2xl">
              <img
                src={currentNuisible.image}
                alt={`Image de ${currentNuisible.title}`}
                className="w-full max-w-md rounded-lg shadow-lg mb-4 mx-auto"
              />
              <h2 className="text-3xl font-semibold mb-2">{currentNuisible.title}</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {currentNuisible.description}
              </p>
            </div>
          )}

          <div className="mb-8 text-left max-w-2xl">
            <h3 className="text-2xl font-semibold mb-2">Information à donner :</h3>
            <ul className="list-disc list-inside text-lg text-gray-300 mb-4">
              <li>Localisation du nid : intérieur, extérieur</li>
              <li>Emplacement du nid</li>
              <li>Hauteur</li>
              <li>Environnement : enfant, passage, public</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-2">Consignes de sécurités :</h3>
            <ul className="list-disc list-inside text-lg text-gray-300">
              <li>Fermer les fenêtres</li>
              <li>Limiter le passage</li>
              <li>Si personne piquée, faire le 18</li>
              <li>Ne pas détruire le nid soi-même</li>
            </ul>
          </div>

          <Button onClick={() => navigate('/home')} className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Retour à l'accueil
          </Button>
        </div>
      );
    };

    export default GuepesPage;
