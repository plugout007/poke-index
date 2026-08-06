import { useEffect, useState } from 'react';
import { } from './styled';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import pokemonJa from "../../data/pokemonJa.json";
import { normalizeText } from '../../utils/text';
import { Pokemon } from "../../types/pokemon";
import { getPokemon } from '../../api/pokeApi';
import PokemonData from './components/pokemon-data';

/**
 * このコンポーネントはポケモン比較画面全体の機能を提供する
 */
export default function Compare() {
  const [name1, setName1] = useState<{ id: number; name: string } | null>(
    null
  );
  const [name2, setName2] = useState<{ id: number; name: string } | null>(
    null
  );
  const [selectedPokemon1, setSelectedPokemon1] = useState<Pokemon | null>(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState<Pokemon | null>(null);

  const pokemonList = pokemonJa.map(p =>( {
    ...p,
    normalizedName: normalizeText(p.name),
  }));

  useEffect(() => {
    if (!name1) return;

    const fetchPokemon = async () => {
      const details = await getPokemon(name1.id);
      setSelectedPokemon1(details);
    };
    fetchPokemon();
  }, [name1]);

  useEffect(() => {
    if (!name2) return;

    const fetchPokemon = async () => {
      const details = await getPokemon(name2.id);
      setSelectedPokemon2(details);
    };
    fetchPokemon();
  }, [name2]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", my: "40px", width: '100%', maxWidth: '1024px', mx: "auto" }}>
      {/* Pokemon 1 */}
      <Box display="flex" flexDirection="column" alignItems="center" sx={{width: 'calc(50% - 16px)', minWidth: '350px'}} >
        <Autocomplete
          options={pokemonList}
          filterOptions={(options, state) => {
            const keyword = normalizeText(state.inputValue);

            return options.filter((option) =>
              normalizeText(option.name).includes(keyword)
            );
          }}
          value={name1}
          onChange={(_, newName1) => {
            setName1(newName1);
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="ポケモン名"
              sx={{
                width: "350px",
                backgroundColor: "background.paper",
                borderRadius: 1,
              }}
            />
          )}
        />
        <Box sx={{ mt: "16px", width: '100%', display: 'flex', justifyContent: 'center' }}>
          {selectedPokemon1 ? (
            <PokemonData pokemon={selectedPokemon1} />
          ) : (
            <Typography variant="h5">ポケモンを選択</Typography>
          )}
        </Box>
      </Box>
      {/* Pokemon 2 */}
      <Box display="flex" flexDirection="column" alignItems="center" sx={{width: 'calc(50% - 16px)', minWidth: '350px'}} >
        <Autocomplete
          options={pokemonList}
          filterOptions={(options, state) => {
            const keyword = normalizeText(state.inputValue);

            return options.filter((option) =>
              normalizeText(option.name).includes(keyword)
            );
          }}
          value={name2}
          onChange={(_, newName2) => {
            setName2(newName2);
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="ポケモン名"
              sx={{
                width: "350px",
                backgroundColor: "background.paper",
                borderRadius: 1,
              }}
            />
          )}
        />
        <Box sx={{ mt: "16px", width: '100%', display: 'flex', justifyContent: 'center' }}>
          {selectedPokemon2 ? (
            <PokemonData pokemon={selectedPokemon2} />
          ) : (
            <Typography variant="h5">ポケモンを選択</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
