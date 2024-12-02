import { } from './styled';
import { useEffect, useState } from 'react';
import PokeCard from '../../components/poke-card';
import { fetchPokemonList, getPokemon } from '../../api/pokeApi';
import { PokemonListResponse, Pokemon } from '../../types/pokemon';
import { Box } from '@mui/material';
/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse['results']>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>('');
  const [prevUrl, setPrevUrl] = useState<string | null>('');

  const API_BASE_URL = 'https://pokeapi.co/api/v2';

  const initOffset = 0   // 開始No - 1
  const initLimit = 25   // 最大表示数
  const buildPokemonListUrl = (offset: number, limit: number): string => {
    const params = new URLSearchParams({ offset: offset.toString(), limit: limit.toString() });
    return `${API_BASE_URL}/pokemon?${params.toString()}`;
  };
  const pokemonListUrl = buildPokemonListUrl(initOffset, initLimit);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await fetchPokemonList(pokemonListUrl);
        console.log(data);
        setPokemonList(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous)
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemon();
  }, []);

  const loadPokemon = async (data) => {
    const _pokemonData = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.id);
        return pokemonRecord
      })
    )
    setPokemonList(_pokemonData)
  }



  const handlePokemonClick = async (id: number) => {
    try {
      const details = await getPokemon(id);
      console.log(details);
      setSelectedPokemon(details);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextPage = async () => {
    if(!nextUrl) return
    let data = await fetchPokemonList(nextUrl);
    await loadPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
  };
  const handlePrevPage = async () => {
    if(!prevUrl) return
    let data = await fetchPokemonList(prevUrl);
    await loadPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: '10px' }}>
        {pokemonList.map((pokemon) => (
          <Box key={pokemon.name} onClick={() => handlePokemonClick(pokemon.id)}>
            <PokeCard pokemon={pokemon}/>
          </Box>
      ))}
      </Box>
      <button onClick={handlePrevPage}>前へ</button>
      <button onClick={handleNextPage}>次へ</button>
      {/* {selectedPokemon && <PokeCard pokemon={selectedPokemon} />} */}
    </div>
  );
};