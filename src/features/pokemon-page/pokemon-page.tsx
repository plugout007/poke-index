import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { getPokemon } from "../../api/pokeApi";
import {} from "./styled";
import { useParams } from "react-router-dom";
import { Pokemon } from "../../types/pokemon";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import NotFound from "../not-found";
import { POKE_INDEX_ID_MAX } from "../../constants/pokemon";
import PokeDetailCard from "./components/poke-detail-card";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 768,
        m: "20px auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: "10px",
        }}
      >
        <IconButton
          component={Link}
          to={'/'}
          sx={{
            bgcolor: "background.paper",
            boxShadow: 2,
            "&:hover": {
              bgcolor: "background.paper",
            },
            "&:active": {
              bgcolor: "background.paper",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
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
        {prevId > 0 && (
          <IconButton
            component={Link}
            to={`/pokemon/${prevId}`}
            sx={{
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "background.paper",
              },
              "&:active": {
                bgcolor: "background.paper",
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
        )}
        {nextId <= POKE_INDEX_ID_MAX && (
          <IconButton
            component={Link}
            to={`/pokemon/${nextId}`}
            sx={{
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": {
                bgcolor: "background.paper",
              },
              "&:active": {
                bgcolor: "background.paper",
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
