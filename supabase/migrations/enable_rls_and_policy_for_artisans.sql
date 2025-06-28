/*
      # Activer RLS et ajouter une politique de lecture pour la table artisans

      1. Sécurité
        - Active le Row Level Security (RLS) sur la table `artisans`.
        - Ajoute une politique RLS nommée "Enable read access for all users"
          qui permet à tous les utilisateurs (y compris non authentifiés via la clé anon)
          de lire les données de la table `artisans`.
    */

    -- Activer le Row Level Security (RLS) sur la table artisans
    ALTER TABLE artisans ENABLE ROW LEVEL SECURITY;

    -- Créer une politique pour permettre la lecture à tous les utilisateurs (anon)
    CREATE POLICY "Enable read access for all users"
      ON artisans
      FOR SELECT
      TO public -- 'public' inclut les utilisateurs anon et authentifiés
      USING (true); -- 'true' signifie que toutes les lignes sont lisibles