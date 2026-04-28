import { useEffect, useState } from "react";
import { getPokemon } from "../../api/pokeApi";
import {} from "./styled";
import { useParams } from "react-router-dom";
import { Pokemon } from "../../types/pokemon";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import NotFound from "../not-found";
import { POKE_INDEX_ID_MAX } from "../../constants/pokemon";
import PokeDetailCard from "./components/poke-detail-card";
/**
 * このコンポーネントはポケモン詳細ページ画面全体の機能を提供する
 */
export default function PokemonPage() {
  const { pokemonId: pokemonId } = useParams<{ pokemonId?: string }>();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const id = pokemonId ? Number(pokemonId) : null;

  const isInvalid =
    id === null || !Number.isInteger(id) || id <= 0 || id > POKE_INDEX_ID_MAX;

  useEffect(() => {
    if (id === null) return;

    const fetchPokemon = async () => {
      const details = await getPokemon(id);
      setSelectedPokemon(details);
    };

    fetchPokemon();
  }, [id]);

  if (isInvalid) {
    return <NotFound />;
  }

  const nextId = id + 1;
  const prevId = id - 1;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          mt: "10px",
        }}
      >
        {selectedPokemon && <PokeDetailCard pokemon={selectedPokemon} />}
      </Box>
      <Box
        sx={{
          display: "flex",
          columnGap: "20px",
          justifyContent: "center",
          mt: "10px",
        }}
      >
        {prevId > 0 && <Link to={`/pokemon/${prevId}`}>prev</Link>}

        {nextId <= POKE_INDEX_ID_MAX && (
          <Link to={`/pokemon/${nextId}`}>next</Link>
        )}
      </Box>
    </>
  );
}
