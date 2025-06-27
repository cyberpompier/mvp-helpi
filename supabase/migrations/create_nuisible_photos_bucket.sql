/*
      # Création du bucket de stockage Supabase et RLS pour les photos de nuisibles

      1. Nouveau bucket de stockage
        - `nuisible-photos`: Stocke les images des nids de nuisibles.
      2. Sécurité
        - Activation du RLS sur le bucket `nuisible-photos`.
        - **Mise à jour de la politique pour permettre aux utilisateurs anonymes de télécharger des photos.**
        - Ajout d'une politique pour permettre aux utilisateurs anonymes de visualiser les photos téléchargées.
    */

    -- Créer le bucket de stockage s'il n'existe pas
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('nuisible-photos', 'nuisible-photos', true)
    ON CONFLICT (id) DO NOTHING;

    -- Politique pour permettre aux utilisateurs anonymes de télécharger des fichiers dans 'nuisible-photos'
    -- (Mise à jour pour 'anon' au lieu de 'authenticated' car il n'y a pas de système d'authentification pour l'instant)
    CREATE POLICY "Allow anon uploads to nuisible-photos"
    ON storage.objects FOR INSERT
    TO anon
    WITH CHECK (bucket_id = 'nuisible-photos');

    -- Politique pour permettre aux utilisateurs anonymes de visualiser les fichiers dans 'nuisible-photos'
    CREATE POLICY "Allow anonymous read access"
    ON storage.objects FOR SELECT
    TO anon
    USING (bucket_id = 'nuisible-photos');
