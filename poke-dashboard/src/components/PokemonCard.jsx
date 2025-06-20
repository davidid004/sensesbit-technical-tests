import React from 'react';

function PokemonCard({ pokemon, onClick, onCompare, isSelected }) {
  return (
    <div
      className={`relative bg-white/90 backdrop-blur-sm text-black rounded-2xl shadow-lg p-4 transition-transform border-2 ${
        isSelected ? 'border-indigo-500 scale-105' : 'border-transparent'
      }`}
    >
      <div onClick={onClick} className="cursor-pointer">
        <img src={pokemon.image} alt={pokemon.name} className="mx-auto h-24 drop-shadow mb-2" />
        <h2 className="text-lg font-bold capitalize text-center">{pokemon.name}</h2>
      </div>

      <button
        onClick={onCompare}
        className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${
          isSelected
            ? 'bg-indigo-500 text-white'
            : 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200'
        }`}
      >
        {isSelected ? '✓ Comparado' : 'Comparar'}
      </button>
    </div>
  );
}

export default PokemonCard;
