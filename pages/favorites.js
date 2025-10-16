import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch('/api/favorites'); // relative path
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchFavorites();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">⭐ Favorite Assets</h1>
        <Link href="/" className="text-blue-600 underline">← Back</Link>
      </div>

      <ul className="space-y-3">
        {favorites.length === 0 && <li className="text-gray-500">No favorite assets yet.</li>}
        {favorites.map((a) => (
          <li key={a.id} className="border p-4 rounded bg-white shadow-sm">
            <p className="font-semibold">{a.name} ({a.symbol})</p>
            <p className="text-gray-600">${a.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}