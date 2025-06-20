import React, { useEffect, useState } from 'react';

function PokemonDetail({ pokemonUrl, onBack, onSelectMove, onSelectPokemon }) {
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);

  useEffect(() => {
  async function fetchPokemon() {
    const res = await fetch(pokemonUrl);
    const data = await res.json();
    setPokemon(data);

    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();

    if (speciesData.evolution_chain?.url) {
      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();
      let evoChain = evoData.chain;
      let current = evoChain;

      // Buscar al Pokémon actual en la cadena
      while (current && current.species.name !== data.name) {
        current = current.evolves_to?.[0];
      }

      // Si tiene siguiente evolución, y no es él mismo, cargarla
      if (
        current?.evolves_to?.length > 0 &&
        current.evolves_to[0].species.name !== data.name
      ) {
        const next = current.evolves_to[0].species.name;
        const nextRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${next}`);
        const nextData = await nextRes.json();
        setEvolution({
          name: nextData.name,
          url: `https://pokeapi.co/api/v2/pokemon/${nextData.id}/`,
          image: nextData.sprites.front_default,
        });
      } else {
        setEvolution(null);
      }
    }
  }
  fetchPokemon();
}, [pokemonUrl]);

  if (!pokemon) return <p className="text-center">Cargando detalles...</p>;

  return (
    <div className="bg-white/90 text-black rounded-2xl p-6 shadow-2xl border border-indigo-100">
      <button
        className="mb-6 px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        onClick={onBack}
      >
        ← Volver
      </button>
      <h2 className="text-4xl font-extrabold capitalize mb-4 text-center">{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto h-40 mb-6 drop-shadow-lg" />

      {evolution && (
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold">Evoluciona a:</h3>
          <div
            onClick={() => onSelectPokemon(evolution.url)}
            className="inline-block mt-2 p-4 bg-indigo-100 rounded-lg cursor-pointer hover:bg-indigo-200"
          >
            <img src={evolution.image} alt={evolution.name} className="h-20 mx-auto" />
            <p className="capitalize font-semibold">{evolution.name}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-inner p-4 mb-6">
        <h3 className="text-2xl font-semibold mb-2">📊 Estadísticas</h3>
        <ul className="space-y-2">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name} className="flex justify-between px-2">
              <span className="font-medium capitalize">{stat.stat.name}</span>
              <span className="font-bold">{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-inner p-4">
        <h3 className="text-2xl font-semibold mb-2">🌀 Movimientos</h3>
        <ul className="flex flex-wrap gap-2">
          {pokemon.moves.slice(0, 15).map((move) => (
            <li key={move.move.name}>
              <button
                onClick={() => onSelectMove(move.move.url)}
                className="bg-indigo-200 hover:bg-indigo-300 text-indigo-900 px-3 py-1 rounded-full text-sm capitalize"
              >
                {move.move.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetail;
