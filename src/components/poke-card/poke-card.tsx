import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { Pokemon } from "../../types/pokemon";
import {} from "./styled";

type Props = {
  pokemon: Pokemon;
};
const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
};
/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function PokeCard({ pokemon }: Props) {
  return (
    <Card sx={{ width: 300, margin: 2, paddingLeft: "10px", bgcolor: "background.paper" }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mt: "5px", fontSize: "18px"  }}>
          No.{pokemon.id}
        </Typography>
        <Typography variant="h5" component="div" sx={{ mt: "5px" }}>
          {pokemon.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: "5px" }}>
          {pokemon.genus}
        </Typography>
        {/* TODO:imgタグではなくMUIに準ずる書き方にする */}
        <img src={pokemon.imageUrl} alt={pokemon.name} />
        {/* <Typography variant="body2" color="text.secondary" sx={{ mt: "5px" }}>
          タイプ: {pokemon.types.join(", ")}
        </Typography> */}
        <Box>
          {pokemon.types.map((type) => (
            <Chip
            key={type.en}
            label={type.ja}
            sx={{
              margin: "5px",
              backgroundColor: typeColors[type.en] || "#D3D3D3",
              color: "#fff",
              fontWeight: "bold",
            }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
