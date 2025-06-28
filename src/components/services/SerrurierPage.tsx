import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { calculateDistance } from '../../lib/utils';
import { Button } from '@/components/ui/button';

interface Artisan {
  id: string;
  profession: string;
  nom: string;
  adresse: string; // Format "Lat: latitude, Long: longitude"
  photo: string;
  note: number;
  phone_number: string; // Ajout du numéro de téléphone
  distance?: number | null; // La distance est optionnelle et peut être null
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

const SerrurierPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    // Réinitialiser les artisans et l'erreur de localisation si l'option change
    setArtisans([]);
    setLocationError(null);
    setUserLocation(null);
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      setLocationError(null);
      setLoading(true); // Mettre en chargement pendant la géolocalisation
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log('Géolocalisation obtenue:', position.coords.latitude, position.coords.longitude);
          setLoading(false); // Fin du chargement
        },
        (err) => {
          console.error('Erreur de géolocalisation:', err);
          setLocationError(`Impossible d'obtenir la géolocalisation: ${err.message}. Veuillez autoriser l'accès à votre position.`);
          setUserLocation(null);
          setLoading(false); // Fin du chargement même en cas d'erreur
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError('La géolocalisation n\'est pas supportée par votre navigateur.');
      setLoading(false); // Fin du chargement
    }
  };

  const fetchArtisans = async () => {
    setLoading(true);
    setError(null);
    console.log('Début de la récupération des artisans...');
    try {
      const { data, error } = await supabase
        .from('artisans')
        .select('id, profession, nom, adresse, photo, note, phone_number');

      if (error) {
        console.error('Erreur Supabase lors de la récupération des artisans:', error);
        setError(`Erreur lors de la récupération des artisans: ${error.message}`);
        setArtisans([]);
      } else {
        console.log('Artisans récupérés avec succès:', data);
        if (userLocation) {
          const artisansWithDistance = data.map(artisan => {
            try {
              const latMatch = artisan.adresse.match(/Lat:\s*([-]?\d+(\.\d+)?)/);
              const lonMatch = artisan.adresse.match(/Long:\s*([-]?\d+(\.\d+)?)/);

              const artisanLat = latMatch && latMatch[1] ? parseFloat(latMatch[1]) : NaN;
              const artisanLon = lonMatch && lonMatch[1] ? parseFloat(lonMatch[1]) : NaN;

              if (isNaN(artisanLat) || isNaN(artisanLon)) {
                console.warn(`Coordonnées invalides après parsing pour l'artisan ${artisan.nom}. Adresse originale: "${artisan.adresse}". Lat extraite: "${latMatch ? latMatch[1] : 'N/A'}", Lon extraite: "${lonMatch ? lonMatch[1] : 'N/A'}"`);
                return { ...artisan, distance: null };
              }

              const dist = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                artisanLat,
                artisanLon
              );
              return { ...artisan, distance: dist };
            } catch (parseError) {
              console.error(`Erreur inattendue lors du parsing de l'adresse pour l'artisan ${artisan.nom}:`, parseError);
              return { ...artisan, distance: null };
            }
          });
          setArtisans(artisansWithDistance);
        } else {
          // Si userLocation n'est pas disponible, ne pas calculer la distance
          setArtisans(data);
        }
      }
    } catch (err) {
      console.error('Erreur inattendue lors de la récupération des artisans:', err);
      setError('Une erreur inattendue est survenue.');
      setArtisans([]);
    } finally {
      setLoading(false);
      console.log('Fin de la récupération des artisans. État des artisans:', artisans);
    }
  };

  useEffect(() => {
    // Déclencher la récupération des artisans uniquement si l'option est 'ouverture_porte' ET que la géolocalisation est disponible
    if (selectedOption === 'ouverture_porte' && userLocation) {
      fetchArtisans();
    } else if (selectedOption === 'ouverture_porte' && !userLocation) {
      // Si l'option est sélectionnée mais pas de géolocalisation, vider la liste des artisans
      setArtisans([]);
    }
  }, [userLocation, selectedOption]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-4xl font-bold mb-8 text-center">Service Serrurier</h2>

      <div className="mb-8 w-full max-w-md">
        <label htmlFor="serrurier-option" className="block text-gray-300 text-lg font-bold mb-4 text-center">
          Sélectionnez une option:
        </label>
        <select
          id="serrurier-option"
          value={selectedOption}
          onChange={handleOptionChange}
          className="block w-full p-3 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white text-lg"
        >
          <option value="">-- Choisissez une option --</option>
          <option value="ouverture_porte">Ouverture de porte</option>
          <option value="ouverture_porte_enfants">Ouverture de porte avec enfants/autres</option>
          <option value="ouverture_porte_aliments">Ouverture de porte avec aliments sur le feu</option>
        </select>
      </div>

      {selectedOption === 'ouverture_porte' && (
        <div className="mb-8 w-full max-w-md space-y-4">
          <button
            onClick={getGeolocation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out text-lg"
            disabled={loading}
          >
            {loading ? 'Géolocalisation en cours...' : 'Me géolocaliser'}
          </button>
          {locationError && <p className="text-red-400 text-sm italic mt-2 text-center">{locationError}</p>}
          {userLocation && (
            <p className="text-gray-300 text-base mt-2 text-center">
              Votre position: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
            </p>
          )}
          {!userLocation && !locationError && !loading && (
            <p className="text-gray-400 text-center mt-4 text-lg">
              Veuillez vous géolocaliser pour afficher les serruriers disponibles.
            </p>
          )}
        </div>
      )}

      {(selectedOption === 'ouverture_porte_enfants' || selectedOption === 'ouverture_porte_aliments') && (
        <div className="mb-8 w-full max-w-md">
          <button
            onClick={() => handleCall('18')}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out text-lg"
          >
            Appeler le 18/112
          </button>
        </div>
      )}

      {error && <p className="text-red-400 text-center mt-4 text-lg">{error}</p>}

      {selectedOption === 'ouverture_porte' && userLocation && artisans.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Artisans disponibles:</h3>
          <ul className="space-y-6">
            {artisans.map((artisan) => (
              <li key={artisan.id} className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg">
                {artisan.photo ? (
                  <img
                    src={artisan.photo}
                    alt={artisan.nom}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4 border-4 border-blue-500">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-xl font-medium text-white mb-1">{artisan.nom} ({artisan.profession})</p>
                  <p className="text-base text-gray-300 mb-1">Note: {artisan.note}/5</p>
                  {'distance' in artisan && artisan.distance !== null && (
                    <p className="text-base text-gray-300 mb-1">
                      Distance: {artisan.distance.toFixed(2)} km
                    </p>
                  )}
                  {artisan.phone_number && (
                    <Button
                      onClick={() => handleCall(artisan.phone_number)}
                      className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-lg"
                    >
                      Appeler {artisan.phone_number}
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedOption === 'ouverture_porte' && userLocation && !loading && !error && artisans.length === 0 && (
        <p className="text-center text-gray-300 mt-4 text-lg">Aucun serrurier trouvé pour le moment.</p>
      )}

      <Button onClick={() => navigate('/home')} className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
        Retour à l'accueil
      </Button>
    </div>
  );
};

export default SerrurierPage;
