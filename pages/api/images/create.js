import {sql} from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const files = req.body.files;
    console.log(files)
    try {
      const { rows } = await sql`
                INSERT INTO imagesdropzone (image)
                VALUES ${files.map((file) => `(${file.data.preview})`).join(',')}
                RETURNING *;`;

      res.status(200).json({ message: 'Fichiers insérés avec succès', data: rows });
    } catch (error) {
      console.error('Erreur lors de l\'insertion des fichiers dans la base de données', error);
      res.status(500).json({ error: 'Erreur lors de l\'insertion des fichiers dans la base de données' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}