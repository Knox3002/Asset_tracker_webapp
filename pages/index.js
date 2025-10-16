import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({ name: '', symbol: '', price: '' });

  // Fetch all assets from backend
  async function fetchAssets() {
    try {
      const res = await fetch('/api/assets'); // relative path ensures JSON
      if (!res.ok) throw new Error('Failed to fetch assets');
      const data = await res.json();
      setAssets(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchAssets();
  }, []);

  // Add new asset
  async function addAsset(e) {
    e.preventDefault();
    if (!form.name || !form.symbol || !form.price) {
      alert('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          symbol: form.symbol,
          price: parseFloat(form.price),
        }),
      });
      if (!res.ok) throw new Error('Failed to add asset');

      setForm({ name: '', symbol: '', price: '' });
      fetchAssets();
    } catch (err) {
      console.error(err);
    }
  }

  // Toggle favorite
  async function toggleFavorite(id) {
    try {
      const res = await fetch('/api/assets/${id}/favorite', { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to toggle favorite');
      fetchAssets();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">💰 Asset Dashboard</h1>

      {/* Add Asset Form */}
      <form
        onSubmit={addAsset}
        className="mb-8 flex flex-col gap-4 bg-white p-6 rounded shadow-md"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Symbol"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.target.value })}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Asset
        </button>
      </form>

      {/* Assets List */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Assets</h2>
        <Link href="/favorites" className="text-blue-600 underline">
          View Favorites ⭐
        </Link>
      </div>

      <ul className="space-y-3">
        {assets.length === 0 && <li className="text-gray-500">No assets yet.</li>}
        {assets.map((a) => (
          <li
            key={a.id}
            className="border p-4 rounded flex justify-between items-center bg-white shadow-sm"
          >
            <div>
              <p className="font-semibold">{a.name} ({a.symbol})</p>
              <p className="text-gray-600">${a.price}</p>
            </div>
            <button
              onClick={() => toggleFavorite(a.id)}
              className="text-2xl"
            >
              {a.favorite ? '⭐' : '☆'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}