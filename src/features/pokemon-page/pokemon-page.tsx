import { useEffect, useState } from "react";
import { getPokemon } from "../../api/pokeApi";
import {} from "./styled";
import { useParams } from "react-router-dom";
import { Pokemon } from "../../types/pokemon";
import PokeDetailCard from "../../components/poke-detail-card";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { POKE_INDEX_ID_MAX } from "../../utils/commonData";
import NotFound from "../not-found";
/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function PokemonPage() {
  const { pokemonId: pokemonId } = useParams<{ pokemonId?: string }>();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);



  useEffect(() => {
    if (!pokemonId) {
      console.error("Invalid Pokemon ID");
      return;
    }
    const fetchPokemon = async () => {
      try {
        const id = parseInt(pokemonId, 10);
        if (isNaN(id)) {
          throw new Error("Invalid Pokemon ID");
        }

        const details = await getPokemon(id);
        setSelectedPokemon(details);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  const nextId = pokemonId ? parseInt(pokemonId, 10) + 1 : POKE_INDEX_ID_MAX + 1;
  const prevId = pokemonId ? parseInt(pokemonId, 10) - 1 : 0;

  if( parseInt(pokemonId) <= 0 || parseInt(pokemonId) > POKE_INDEX_ID_MAX) {
    return(
      <>
        <NotFound />
      </>
    )
  }

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

        {nextId <= POKE_INDEX_ID_MAX &&<Link to={`/pokemon/${nextId}`}>next</Link>}
      </Box>
    </>
  );
}
