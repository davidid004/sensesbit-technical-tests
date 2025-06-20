import React, { useState, useEffect } from 'react';

function MoveSelector({ onMoveSelect }) {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMoves() {
      const res = await fetch('https://pokeapi.co/api/v2/move?limit=200');
      const data = await res.json();
      setMoves(data.results);
      setLoading(false);
    }
    fetchMoves();
  }, []);

  return (
    <div className="mb-8 text-center">
      {loading ? (
        <p className="text-lg animate-pulse">Cargando movimientos...</p>
      ) : (
        <select
            className="w-full md:w-2/3 lg:w-1/2 p-3 rounded-xl bg-white/90 text-black shadow-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            onChange={(e) => onMoveSelect(e.target.value)}
            defaultValue=""
            >
            <option value="" disabled className="text-gray-500">
                Selecciona un movimiento
            </option>
            {moves.map(move => (
                <option key={move.name} value={move.url} className="capitalize">
                {move.name}
                </option>
            ))}
        </select>
      )}
    </div>
  );
}

export default MoveSelector;
