import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { memo } from "react";
import { typeData } from "../../../../constants/pokemon";
import { PokemonListItem } from "../../../../types/pokemon";

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
        width: 240,
        margin: 2,
        paddingLeft: "10px",
        bgcolor: "background.paper",
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
        <Typography variant="h5" component="div" sx={{ mt: "5px" }}>
          {pokemon.name}
        </Typography>
        {/* TODO:imgタグではなくMUIに準ずる書き方にする */}
        <Box display="flex" justifyContent="start">
          <img src={pokemonImageUrl} alt={pokemon.name} loading="lazy" />
        </Box>
        <Box>
          {pokemon.types.map((type) => {
            const typeInfo = typeData[type as keyof typeof typeData];

            return (
              <Chip
                key={type}
                label={typeInfo?.ja ?? type}
                sx={{
                  m: 5,
                  backgroundColor: typeInfo?.color ?? "#D3D3D3",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              />
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
});
