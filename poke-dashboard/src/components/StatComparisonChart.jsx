import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatComparisonChart({ pokemonA, pokemonB }) {
  const labels = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def'];

  const getStat = (poke, statName) => {
    const found = poke.stats.find(s => s.stat.name === statName);
    return found ? found.base_stat : 0;
  };

  const data = {
    labels,
    datasets: [
      {
        label: pokemonA.name,
        data: [
          getStat(pokemonA, 'hp'),
          getStat(pokemonA, 'attack'),
          getStat(pokemonA, 'defense'),
          getStat(pokemonA, 'special-attack'),
          getStat(pokemonA, 'special-defense')
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.6)'
      },
      {
        label: pokemonB.name,
        data: [
          getStat(pokemonB, 'hp'),
          getStat(pokemonB, 'attack'),
          getStat(pokemonB, 'defense'),
          getStat(pokemonB, 'special-attack'),
          getStat(pokemonB, 'special-defense')
        ],
        backgroundColor: 'rgba(239, 68, 68, 0.6)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Comparativa de Stats' }
    }
  };

  return (
    <div className="w-full bg-white rounded shadow p-4 text-black">
      <Bar data={data} options={options} />
    </div>
  );
}

export default StatComparisonChart;
