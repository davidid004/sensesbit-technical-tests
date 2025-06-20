import React, { useState } from 'react';
import MoveSelector from './components/MoveSelector';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

function App() {
  const [selectedMove, setSelectedMove] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleSelectMove = (moveUrl) => {
    setSelectedMove(moveUrl);
    setSelectedPokemon(null);
  };

  const handleSelectPokemon = (pokemonUrl) => {
    setSelectedPokemon(pokemonUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 drop-shadow-lg tracking-tight">🔍 Pokédex por Movimiento</h1>
        <MoveSelector onMoveSelect={handleSelectMove} />
        {selectedPokemon ? (
          <PokemonDetail
            pokemonUrl={selectedPokemon}
            onBack={() => setSelectedPokemon(null)}
            onSelectMove={handleSelectMove}
            onSelectPokemon={handleSelectPokemon}
          />
        ) : (
          selectedMove && <PokemonList moveUrl={selectedMove} onSelectPokemon={handleSelectPokemon} />
        )}
      </div>
    </div>
  );
}

export default App;
