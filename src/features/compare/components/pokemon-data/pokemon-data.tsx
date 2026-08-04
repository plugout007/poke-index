import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { Pokemon } from '../../../../types/pokemon';
import { typeData } from "../../../../constants/pokemon";
import { } from './styled';

type Props = {
  pokemon: Pokemon;
};

/**
 * このコンポーネントはポケモンデータを表示する
 */
export default function PokemonData({ pokemon }: Props) {

  return (
    <Card sx={{ minWidth: 350, margin: 2, bgcolor: "background.paper" }}>
      <CardContent>
        <Typography variant="h5" color="text.secondary" sx={{ mt: "5px" }}>
          No.{pokemon.id.toString().padStart(4, "0")}
        </Typography>
        <Typography variant="h3" component="div" sx={{ mt: "5px" }}>
          {pokemon.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: "5px" }}>
          {pokemon.genus}
        </Typography>
        {pokemon.gender.length > 0 && (
          <Box sx={{ display: "flex", gap: '8px', mt: "5px" }}>
            {pokemon.gender.includes("female") && (
              <Typography variant="h4" color="red">
                ♀
              </Typography>
            )}
            {pokemon.gender.includes("male") && (
              <Typography variant="h4" color="blue">
                ♂
              </Typography>
            )}
            {pokemon.gender.includes("unknown") && (
              <Typography variant="body2" color="text.secondary">
                性別不明
              </Typography>
            )}
          </Box>
        )}
        <Box
          component="img"
          src={pokemon.imageUrl}
          alt={pokemon.name}
          sx={{
            width: 240,
            height: 240,
            display: "block",
            mx: "auto",
            filter: "drop-shadow(0 12px 16px rgba(0,0,0,0.2))",
          }}
        />
        <Box sx={{ mt: "5px" }}>
          {pokemon.types.map((type) => (
            <Chip
              key={type}
              label={typeData[type as keyof typeof typeData]?.ja || type}
              sx={{
                margin: "5px",
                backgroundColor:
                  typeData[type as keyof typeof typeData]?.color || "#D3D3D3",
                color: "#fff",
                fontWeight: "bold",
              }}
            />
          ))}
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography variant="h5">
            たかさ
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
            {pokemon.height}m
          </Typography>
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography variant="h5">
            おもさ
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
            {pokemon.weight}kg
          </Typography>
        </Box>
        <Box sx={{ mt: "16px" }}>
            <Typography variant="h5">
              特性
            </Typography>
            {pokemon.abilities
              .map((ability) =>(
                <Box sx={{ mt: "8px", ml: "16px" }}>
                  <Typography variant="h6">
                    {ability.isHidden ? `${ability.name}(隠れ)` : ability.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: "4px" }}>
                    {ability.flavorText}
                  </Typography>
                </Box>
              ))
            }
        </Box>
        <Box sx={{ mt: "16px" }}>
          詳しいデータのボタンを表示する
        </Box>
      </CardContent>
    </Card>
  );
}
