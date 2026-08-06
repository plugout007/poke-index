import { Box, Card, CardContent, Typography } from "@mui/material";
import { memo } from "react";
import { PokemonListItem } from "../../../../types/pokemon";
import PokemonTypes from "../../../../components/pokemon-types";

type Props = {
  pokemon: PokemonListItem;
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default memo(function PokeCard({ pokemon }: Props) {
  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  return (
    <Card
      sx={{
        width: 220,
        margin: 2,
        bgcolor: "background.paper",
        transition: "background-color 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          bgcolor: "#f5f5f5",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ mt: "5px", fontSize: "18px" }}
        >
          No.{pokemon.id.toString().padStart(4, "0")}
        </Typography>
        <Typography variant="h3" component="div" sx={{ mt: "5px" }}>
          {pokemon.name}
        </Typography>
        <Box display="flex" justifyContent="center">
          <img src={pokemonImageUrl} alt={pokemon.name} loading="lazy" />
        </Box>
        <Box display="flex" justifyContent="center">
          <PokemonTypes types={pokemon.types} />
        </Box>
      </CardContent>
    </Card>
  );
});
