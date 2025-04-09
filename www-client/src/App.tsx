import { useEffect, useState } from 'react';

interface Pokemon {
  id: number;
  name: string;
  type: string[];
  weight: string;
  height: string;
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [team1Ids, setTeam1Ids] = useState<string[]>([]);
  const [team2Ids, setTeam2Ids] = useState<string[]>([]);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('/api/pokemon');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data: { pokemon: Pokemon[] } = await response.json();

        setPokemon(data.pokemon);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, []);

  const handleTeam1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPokemonIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setTeam1Ids(selectedPokemonIds);
  };

  const handleTeam2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPokemonIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setTeam2Ids(selectedPokemonIds);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const team1 = pokemon.filter((pokemon) =>
      team1Ids.includes(String(pokemon.id))
    );
    const team2 = pokemon.filter((pokemon) =>
      team2Ids.includes(String(pokemon.id))
    );

    try {
      // Send the teams to the /api/battle endpoint
      const response = await fetch('/api/battle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team1, team2 }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setBattleLog(result.battleLog);
    } catch (error) {
      console.error('Failed to post battle data:', error);
    }
  };

  return (
    <section className="max-w-3xl p-8">
      <h1 className="text-2xl font-bold mb-4">Pokémon Battle</h1>

      {pokemon && pokemon.length > 0 && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="flex flex-col">
              <label htmlFor="team1" className="mb-2">
                Team 1:
              </label>
              <select
                className="border min-h-60"
                id="team1"
                multiple
                value={team1Ids}
                onChange={handleTeam1Change}
              >
                {pokemon.map((p) => (
                  <option key={p.name} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="team2" className="mb-2">
                Team 2:
              </label>
              <select
                className="border min-h-60"
                id="team2"
                multiple
                value={team2Ids}
                onChange={handleTeam2Change}
              >
                {pokemon.map((p) => (
                  <option key={p.name} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="flex  bg-black text-white p-2">
            Battle!
          </button>
        </form>
      )}

      {battleLog.length > 0 && (
        <div className="mt-6 p-4 border border-gray-300 bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Battle Log</h2>
          <ul className="list-disc pl-5">
            {battleLog.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default App;
