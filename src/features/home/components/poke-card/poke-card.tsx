import { Box, Card, CardContent, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { memo } from "react";
import { PokemonListItem } from "../../../../types/pokemon";
import PokemonTypes from "../../../../components/pokemon-types";
import { getPokemonImageUrl } from "../../../../utils/getPokemonImageUrl";

type Props = {
  pokemon: PokemonListItem;
  isFavorite: boolean;
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default memo(function PokeCard({ pokemon, isFavorite }: Props) {
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
        <Box display="flex" justifyContent="space-between">
          <Box>
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
          </Box>
          {isFavorite && (
            <StarIcon sx={{ color: "gold", fontSize: 30, mt: "5px" }} />
          )}
        </Box>
        <Box display="flex" justifyContent="center">
          <img src={getPokemonImageUrl(pokemon.baseFormId)} alt={pokemon.name} loading="lazy" width={96} height={96}/>
        </Box>
        <Box display="flex" justifyContent="center">
          <PokemonTypes types={pokemon.types} />
        </Box>
      </CardContent>
    </Card>
  );
});
