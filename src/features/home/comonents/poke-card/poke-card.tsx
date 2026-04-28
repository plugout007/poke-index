import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { typeData } from "../../../../constants/pokemon";
import { Pokemon } from "../../../../types/pokemon";

type Props = {
  pokemon: Pokemon;
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
        <Box>
          {pokemon.types.map((type) => (
            <Chip
            key={type.en}
            label={typeData[type.en as keyof typeof typeData]?.ja || type.ja}
            sx={{
              margin: "5px",
              backgroundColor: typeData[type.en as keyof typeof typeData]?.color || "#D3D3D3",
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
