import pool from '../../../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { id } = req.query;
    try {
      const { rows } = await pool.query('SELECT favorite FROM assets WHERE id=$1', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Asset not found' });

      const newFavorite = !rows[0].favorite;
      await pool.query('UPDATE assets SET favorite=$1 WHERE id=$2', [newFavorite, id]);
      res.status(200).json({ id, favorite: newFavorite });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database update failed' });
    }
  } else {
    res.status(405).end();
  }
}