import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import StatComparisonChart from './StatComparisonChart';

function PokemonList({ moveUrl, onSelectPokemon }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    async function fetchPokemonsByMove() {
      setLoading(true);
      const res = await fetch(moveUrl);
      const data = await res.json();
      const results = await Promise.all(
        data.learned_by_pokemon.map(async (p) => {
          const res = await fetch(p.url);
          const pokeData = await res.json();
          return {
            name: pokeData.name,
            url: p.url,
            image: pokeData.sprites.front_default,
            height: pokeData.height,
            stats: pokeData.stats,
          };
        })
      );
      setPokemons(results);
      setLoading(false);
    }
    if (moveUrl) fetchPokemonsByMove();
  }, [moveUrl]);

  const sortedPokemons = [...pokemons].sort((a, b) => {
    return sortOrder === 'asc' ? a.height - b.height : b.height - a.height;
  });

  const toggleCompare = (pokemon) => {
    setSelectedForCompare((prev) => {
      if (prev.find((p) => p.name === pokemon.name)) {
        return prev.filter((p) => p.name !== pokemon.name);
      }
      if (prev.length < 2) {
        const updated = [...prev, pokemon];
        if (updated.length === 2) {
          setShowComparison(true);
        }
        return updated;
      }
      return prev;
    });
  };

  if (showComparison && selectedForCompare.length === 2) {
    return (
      <div className="bg-white/90 text-black rounded-xl p-6 shadow-xl">
        <button
          className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={() => {
            setShowComparison(false);
            setSelectedForCompare([]);
          }}
        >
          ← Volver al listado
        </button>
        <StatComparisonChart
          pokemonA={selectedForCompare[0]}
          pokemonB={selectedForCompare[1]}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label className="text-sm mr-2">Ordenar por altura:</label>
          <select
            className="bg-white text-black rounded px-3 py-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {loading ? (
          <p className="col-span-full text-center text-lg animate-pulse">Cargando Pokémon...</p>
        ) : (
          sortedPokemons.map(pokemon => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              onClick={() => onSelectPokemon(pokemon.url)}
              onCompare={() => toggleCompare(pokemon)}
              isSelected={selectedForCompare.some(p => p.name === pokemon.name)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PokemonList;
