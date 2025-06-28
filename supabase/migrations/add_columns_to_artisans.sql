/*
      # Ajout de colonnes à la table artisans

      1. Modifications de la table `artisans`
        - Ajout de la colonne `profession` (text, par défaut '')
        - Ajout de la colonne `nom` (text, par défaut '')
        - Ajout de la colonne `adresse` (text, pour les coordonnées GPS, par défaut '')
        - Ajout de la colonne `photo` (text, pour l'URL de la photo, par défaut '')
        - Ajout de la colonne `note` (numeric, par défaut 0)
    */

    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artisans' AND column_name = 'profession') THEN
        ALTER TABLE artisans ADD COLUMN profession text DEFAULT '';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artisans' AND column_name = 'nom') THEN
        ALTER TABLE artisans ADD COLUMN nom text DEFAULT '';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artisans' AND column_name = 'adresse') THEN
        ALTER TABLE artisans ADD COLUMN adresse text DEFAULT '';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artisans' AND column_name = 'photo') THEN
        ALTER TABLE artisans ADD COLUMN photo text DEFAULT '';
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'artisans' AND column_name = 'note') THEN
        ALTER TABLE artisans ADD COLUMN note numeric DEFAULT 0;
      END IF;
    END $$;