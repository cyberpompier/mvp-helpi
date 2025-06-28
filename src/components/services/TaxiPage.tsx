import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TaxiPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Service Taxi</h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Cette page est en cours de construction. Trouvez votre taxi rapidement et facilement !
      </p>
      <Button onClick={() => navigate('/home')} className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
        Retour à l'accueil
      </Button>
    </div>
  );
};

export default TaxiPage;
