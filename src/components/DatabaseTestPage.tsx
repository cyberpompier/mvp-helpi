import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const DatabaseTestPage: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState('Vérification de la connexion...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Tente une requête simple pour vérifier la connexion
        const { data, error } = await supabase.from('test_connection').select('*').limit(1);

        if (error) {
          console.error('Erreur de connexion Supabase:', error);
          setError(error.message);
          setConnectionStatus('Échec de la connexion');
        } else {
          setConnectionStatus('Connexion réussie !');
          console.log('Données de test (si existantes):', data);
        }
      } catch (err) {
        console.error('Erreur inattendue lors du test de connexion:', err);
        setError((err as Error).message);
        setConnectionStatus('Échec de la connexion (erreur inattendue)');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Test de Connexion à la Base de Données</h1>
        <p className={`text-lg font-semibold ${connectionStatus.includes('réussie') ? 'text-green-600' : 'text-red-600'} mb-4`}>
          {connectionStatus}
        </p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Erreur: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <p className="text-sm text-gray-600 mb-6">
          Si la connexion échoue, assurez-vous que vos variables d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans le fichier `.env` sont correctes et que votre base de données Neon est accessible.
        </p>
        <Link to="/home" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default DatabaseTestPage;
