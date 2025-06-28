import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ajout de logs pour vérifier les variables d'environnement
console.log('Supabase URL chargée:', supabaseUrl ? 'Chargée' : 'Non chargée');
console.log('Supabase Anon Key chargée:', supabaseAnonKey ? 'Chargée' : 'Non chargée');
console.log('Valeur de VITE_SUPABASE_URL:', supabaseUrl);
console.log('Valeur de VITE_SUPABASE_ANON_KEY (partielle pour sécurité):', supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + '...' : 'Non définie');


if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL ou Anon Key n\'est pas définie dans les variables d\'environnement.');
  // Optionally, throw an error or handle this more gracefully in a production app
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
