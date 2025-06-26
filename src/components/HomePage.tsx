{/*
      # Composant HomePage

      Ce fichier contient le composant React pour la page d'accueil de l'application.
      Il affiche le logo en haut et un espace réservé pour un carrousel en dessous.

      1. Nouvelle fonctionnalité
        - Affichage du logo de l'application en haut de la page.
        - Section dédiée pour un carrousel de contenu.
        - Intégration du composant Carousel avec des images spécifiques (sac, ps, vsav).
        - Ajout de la navigation au clic sur les éléments du carrousel vers des pages de service spécifiques.
      2. Composants
        - Utilise des classes Tailwind CSS pour le style et la mise en page.
        - Intégration du composant Carousel de shadcn/ui.
        - Utilise `useNavigate` de `react-router-dom` pour la navigation.
      3. Changements
        - Modification de l'affichage des images du carrousel pour montrer la totalité de l'image.
        - Remplacement de `object-cover` par `object-contain` et suppression de `aspect-video` pour éviter le recadrage.
        - Ajout d'un gestionnaire de clic (`onClick`) à chaque `CarouselItem` pour naviguer vers la route correspondante.
    */}
    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import {
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselNext,
      CarouselPrevious,
    } from '@/components/ui/carousel';

    const carouselItems = [
      {
        src: '/guepes.JPEG',
        alt: 'Image de guepe',
        title: 'Guepes',
        description: 'Destruction de nuisibles',
        path: '/services/guepes',
      },
      {
        src: '/serrurier.JPEG',
        alt: 'Image de PlayStation',
        title: 'Serrurier',
        description: 'Pour tout probleme d\'ouverture de porte',
        path: '/services/serrurier',
      },
      {
        src: '/taxi.JPEG',
        alt: 'Image de VSAV',
        title: 'Taxi',
        description: 'Trouver un taxi à proximité',
        path: '/services/taxi',
      },
    ];

    const HomePage: React.FC = () => {
      const navigate = useNavigate();

      const handleItemClick = (path: string) => {
        navigate(path);
      };

      return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
          {/* Logo en haut de la page */}
          <div className="w-full flex justify-center py-8">
            <img src="/logo.png" alt="App Logo" className="w-24 h-24" />
          </div>

          {/* Message de bienvenue */}
          <h1 className="text-4xl font-bold mb-8 text-center">Bienvenue sur HELPi !</h1>
          <h2 className="text-2xl font-semibold mb-4">Quel est votre urgence ?</h2>
          {/* Section Carrousel */}
          <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-8 relative">
            
            <Carousel className="w-full max-w-xs mx-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <div
                      className="p-1 cursor-pointer" // Ajout de cursor-pointer pour indiquer la cliquabilité
                      onClick={() => handleItemClick(item.path)}
                    >
                      <div className="flex flex-col items-center justify-center bg-gray-700 rounded-md overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-contain"
                        />
                        <div className="p-4 text-center">
                          <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Contenu supplémentaire (exemple) */}
          <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Découvrez nos fonctionnalités</h2>
            <p className="text-gray-300">
             Bientot, grace à l'intelligence artificielle, vour pourrez trouver des solutions rapides et pratiques à vos besoins et urgences.
            </p>
          </div>
        </div>
      );
    };

    export default HomePage;
