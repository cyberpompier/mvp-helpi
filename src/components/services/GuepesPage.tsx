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
        - Ajout d'une liste déroulante pour la localisation du nid ("interieur de l'habitation", "exterieur de l'habitation").
        - Ajout d'une liste déroulante conditionnelle "estimer la hauteur" si le nid est à l'extérieur.
        - Ajout d'une liste déroulante conditionnelle "localisation" si une hauteur est sélectionnée.
        - Ajout d'un champ de saisie pour prendre une photo avec l'appareil.
        - Affichage des sélections faites par l'utilisateur, y compris la photo prise.
        - Bouton de retour pour naviguer vers la page d'accueil.
        - **Ajout de fonctionnalités de partage :**
          - Bouton "Copier les sélections" pour copier les données formatées dans le presse-papiers.
          - Bouton "Envoyer par SMS" pour ouvrir l'application de messagerie avec les données pré-remplies.
          - Bouton "Envoyer par E-mail" pour ouvrir l'application de messagerie avec les données pré-remplies.
          - Utilisation du hook `useToast` pour les notifications de copie.
          - **Amélioration du partage de photos :**
            - La photo est maintenant uploadée sur Supabase Storage.
            - Le lien public de la photo est inclus dans les informations partagées.
      2. Composants
        - Utilise `useNavigate` de `react-router-dom` pour la navigation.
        - Utilise `useState` de React pour gérer l'état de la sélection et de l'image.
        - Utilise les composants `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` de `@/components/ui/select`.
        - Utilise les composants `Button` de `@/components/ui/button`.
        - Utilise le hook `useToast` de `@/hooks/use-toast`.
        - Utilise des classes Tailwind CSS pour le style.
        - Utilise le client Supabase pour l'upload de photos.
      3. Correction
        - Correction du texte du label pour le sélecteur de localisation du nid.
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
    import { useToast } from '@/hooks/use-toast';
    import { supabase } from '@/lib/supabase'; // Importez supabase

    interface NuisibleInfo {
      title: string;
      description: string;
      image: string;
    }

    const GuepesPage: React.FC = () => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const [selectedNuisible, setSelectedNuisible] = useState<string>('guepes');
      const [nestLocation, setNestLocation] = useState<string>('');
      const [nestHeight, setNestHeight] = useState<string>('');
      const [nestLocationDetail, setNestLocationDetail] = useState<string>('');
      const [photo, setPhoto] = useState<string | null>(null); // Pour l'aperçu local (Base64)
      const [photoUrl, setPhotoUrl] = useState<string | null>(null); // Pour l'URL Supabase

      const nuisibleData: { [key: string]: NuisibleInfo } = {
        guepes: {
          title: 'Guêpes Communes',
          description: 'Les guêpes communes construisent leurs nids dans des endroits abrités comme les greniers, les cavités murales ou sous terre. Elles sont attirées par la nourriture sucrée et les protéines, et peuvent devenir agressives si leur nid est menacé. La destruction de leur nid doit être effectuée par des professionnels pour éviter les piqûres multiples.',
          image: 'https://i.postimg.cc/9QwL4rmh/guepes.jpg',
        },
        frelons: {
          title: 'Frelons Européens',
          description: 'Les frelons européens sont plus grands que les guêpes et construisent souvent leurs nids dans des arbres creux, des cheminées ou des abris de jardin. Bien qu\'impressants, ils sont généralement moins agressifs que les guêpes, sauf s\'ils se sentent menacés. Leurs piqûres sont douloureuses mais rarement dangereuses, sauf en cas d\'allergie.',
          image: 'https://i.postimg.cc/nLP7q10S/frelon.jpg',
        },
        frelons_asiatiques: {
          title: 'Frelons Asiatiques',
          description: 'Le frelon asiatique est une espèce invasive qui représente une menace sérieuse pour les abeilles et la biodiversité. Leurs nids, souvent sphériques et de grande taille, sont construits en hauteur dans les arbres ou sous les toits. Il est crucial de signaler et de faire détruire ces nids par des spécialistes, car ils sont très défensifs et leurs piqûres peuvent être dangereuses.',
          image: 'https://i.postimg.cc/zfSSWh49/frelon-asiatique.jpg',
        },
        abeilles: {
          title: 'Abeilles',
          description: 'Les abeilles sont des pollinisateurs essentiels et sont protégées. Nous privilégions le déplacement des essaims plutôt que leur destruction. Si vous avez un essaim d\'abeilles, contactez-nous pour une intervention respectueuse de l\'environnement, visant à relocaliser la colonie en toute sécurité.',
          image: 'https://i.postimg.cc/tT3fs7zT/abeille.jpg',
        },
        bourdons: {
          title: 'Bourdons',
          description: 'Les bourdons sont de grands insectes velus, également d\'excellents pollinisateurs. Ils construisent leurs nids généralement sous terre, dans des cavités ou des tas de compost. Ils sont très peu agressifs et ne piquent que s\'ils sont directement menacés. Comme les abeilles, nous favorisons leur déplacement plutôt que leur éradication.',
          image: 'https://i.postimg.cc/Px5ZwRWw/bourdon.jpg',
        },
      };

      const currentNuisible = nuisibleData[selectedNuisible];

      const handleSelectChange = (value: string) => {
        setSelectedNuisible(value);
      };

      const handleNestLocationChange = (value: string) => {
        setNestLocation(value);
        if (value !== 'exterieur') {
          setNestHeight('');
          setNestLocationDetail('');
        }
      };

      const handleNestHeightChange = (value: string) => {
        setNestHeight(value);
        if (!value) {
          setNestLocationDetail('');
        }
      };

      const handleNestLocationDetailChange = (value: string) => {
        setNestLocationDetail(value);
      };

      const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          // Pour l'aperçu local immédiat
          const reader = new FileReader();
          reader.onloadend = () => {
            setPhoto(reader.result as string);
          };
          reader.readAsDataURL(file);

          // Upload vers Supabase Storage
          const filePath = `public/${Date.now()}_${file.name}`; // Nom de fichier unique
          const { data, error } = await supabase.storage
            .from('nuisible-photos')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false,
            });

          if (error) {
            console.error('Erreur lors de l\'upload de la photo:', error);
            toast({
              title: 'Erreur d\'upload',
              description: 'Impossible d\'uploader la photo. Veuillez réessayer.',
              variant: 'destructive',
            });
            setPhotoUrl(null);
          } else {
            // Récupérer l'URL publique de la photo uploadée
            const { data: publicUrlData } = supabase.storage
              .from('nuisible-photos')
              .getPublicUrl(data.path);

            if (publicUrlData) {
              setPhotoUrl(publicUrlData.publicUrl);
              toast({
                title: 'Photo uploadée !',
                description: 'La photo a été uploadée avec succès.',
              });
            } else {
              console.error('Impossible de récupérer l\'URL publique de la photo.');
              toast({
                title: 'Erreur',
                description: 'Impossible de récupérer l\'URL de la photo.',
                variant: 'destructive',
              });
              setPhotoUrl(null);
            }
          }
        } else {
          setPhoto(null);
          setPhotoUrl(null);
        }
      };

      const formatSelectionsForShare = () => {
        let text = "Informations sur le nid de nuisibles :\n\n";
        if (selectedNuisible) {
          text += `Type de nuisible : ${nuisibleData[selectedNuisible]?.title || selectedNuisible}\n`;
        }
        if (nestLocation) {
          text += `Localisation du nid : ${nestLocation === 'interieur' ? 'Intérieur de l\'habitation' : 'Extérieur de l\'habitation'}\n`;
        }
        if (nestHeight) {
          text += `Hauteur estimée : ${nestHeight}\n`;
        }
        if (nestLocationDetail) {
          text += `Détail de la localisation : ${nestLocationDetail}\n`;
        }
        if (photoUrl) {
          text += `Lien vers la photo du nid : ${photoUrl}\n`;
        } else if (photo) {
          text += `Photo du nid : (prise, mais non uploadée ou lien non disponible)\n`;
        }
        return text;
      };

      const handleCopySelections = async () => {
        const textToCopy = formatSelectionsForShare();
        try {
          await navigator.clipboard.writeText(textToCopy);
          toast({
            title: 'Copié !',
            description: 'Les informations ont été copiées dans le presse-papiers.',
          });
        } catch (err) {
          console.error('Failed to copy: ', err);
          toast({
            title: 'Erreur de copie',
            description: 'Impossible de copier les informations.',
            variant: 'destructive',
          });
        }
      };

      const handleShareSMS = () => {
        const textToShare = formatSelectionsForShare();
        const encodedText = encodeURIComponent(textToShare);
        window.location.href = `sms:?body=${encodedText}`;
      };

      const handleShareEmail = () => {
        const subject = encodeURIComponent("Demande d'intervention - Nuisibles");
        const body = encodeURIComponent(formatSelectionsForShare());
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
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

          <div className="w-full max-w-xs mb-8">
						<p className="text-lg text-gray-300 mb-2 text-center">
            Où se trouve le nid ?
          </p>
            <Select onValueChange={handleNestLocationChange} value={nestLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Où se situe le nid ?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interieur">Intérieur de l'habitation</SelectItem>
                <SelectItem value="exterieur">Extérieur de l'habitation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {nestLocation === 'exterieur' && (
            <div className="w-full max-w-xs mb-8">
              <p className="text-lg text-gray-300 mb-2 text-center">
                Estimer la hauteur :
              </p>
              <Select onValueChange={handleNestHeightChange} value={nestHeight}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Estimer la hauteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="au_sol">Au sol</SelectItem>
                  <SelectItem value="hauteur_homme">Hauteur d'homme</SelectItem>
                  <SelectItem value="moins_3_metres">Moins de 3 mètres</SelectItem>
                  <SelectItem value="plus_3_metres">Plus de 3 mètres</SelectItem>
                  <SelectItem value="plus_10_metres">Plus de 10 mètres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {nestHeight && (
            <div className="w-full max-w-xs mb-8">
              <p className="text-lg text-gray-300 mb-2 text-center">
                Localisation :
              </p>
              <Select onValueChange={handleNestLocationDetailChange} value={nestLocationDetail}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetation">Végétation</SelectItem>
                  <SelectItem value="structure_batimentaire">Structure bâtimentaire</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Nouveau champ pour la photo */}
          <div className="w-full max-w-xs mb-8">
            <p className="text-lg text-gray-300 mb-2 text-center">
              Prendre une photo du nid :
            </p>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          <div className="mt-8 p-4 bg-gray-800 rounded-lg shadow-md w-full max-w-md text-left">
            <h3 className="text-xl font-semibold mb-4 text-center">Vos sélections :</h3>
            <ul className="list-disc list-inside text-lg text-gray-300">
              {selectedNuisible && (
                <li>
                  Type de nuisible : <span className="font-bold">{nuisibleData[selectedNuisible]?.title || selectedNuisible}</span>
                </li>
              )}
              {nestLocation && (
                <li>
                  Localisation du nid : <span className="font-bold">{nestLocation === 'interieur' ? 'Intérieur de l\'habitation' : 'Extérieur de l\'habitation'}</span>
                </li>
              )}
              {nestHeight && (
                <li>
                  Hauteur estimée : <span className="font-bold">{nestHeight}</span>
                </li>
              )}
              {nestLocationDetail && (
                <li>
                  Détail de la localisation : <span className="font-bold">{nestLocationDetail}</span>
                </li>
              )}
              {photoUrl ? (
                <li className="mt-4">
                  Photo du nid : <a href={photoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Voir la photo</a>
                  <img src={photo} alt="Aperçu du nid" className="mt-2 w-full max-w-xs rounded-lg shadow-md mx-auto" />
                </li>
              ) : photo && (
                <li className="mt-4">
                  Photo du nid :
                  <img src={photo} alt="Aperçu du nid" className="mt-2 w-full max-w-xs rounded-lg shadow-md mx-auto" />
                </li>
              )}
              {!selectedNuisible && !nestLocation && !nestHeight && !nestLocationDetail && !photo && (
                <li>Aucune sélection effectuée.</li>
              )}
            </ul>
            <div className="flex flex-col space-y-2 mt-4">
              <Button onClick={handleCopySelections} className="bg-green-600 hover:bg-green-700 text-white">
                Copier les sélections
              </Button>
              <Button onClick={handleShareSMS} className="bg-purple-600 hover:bg-purple-700 text-white">
                Envoyer par SMS
              </Button>
              <Button onClick={handleShareEmail} className="bg-orange-600 hover:bg-orange-700 text-white">
                Envoyer par E-mail
              </Button>
            </div>
          </div>

          <Button onClick={() => navigate('/home')} className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Retour à l'accueil
          </Button>
        </div>
      );
    };

    export default GuepesPage;
