import pool from '../../utils/db';

export default async function handler(req, res) {
  try {
    const { rows } = await pool.query('SELECT * FROM assets WHERE favorite=true ORDER BY id DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
}