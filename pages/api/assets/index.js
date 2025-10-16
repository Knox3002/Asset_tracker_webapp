import pool from '../../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM assets ORDER BY id DESC');
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    }
  } else if (req.method === 'POST') {
    const { name, symbol, price } = req.body;
    if (!name || !symbol || !price) return res.status(400).json({ error: 'Missing fields' });

    try {
      const { rows } = await pool.query(
        'INSERT INTO assets (name, symbol, price) VALUES ($1, $2, $3) RETURNING *',
        [name, symbol, price]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database insert failed' });
    }
  } else {
    res.status(405).end();
  }
}