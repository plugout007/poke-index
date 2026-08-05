import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Pokemon } from '../../../../types/pokemon';
import { typeData } from "../../../../constants/pokemon";
import { } from './styled';
import { useNavigate } from "react-router-dom";
import { calcTypeMultiplier } from "../../../../utils/calcTypeMultiplier";

type Props = {
  pokemon: Pokemon;
};
const MAX_STAT = 255;

/**
 * このコンポーネントはポケモンデータを表示する
 */
export default function PokemonData({ pokemon }: Props) {
  const navigate = useNavigate();

  const handleNavigate = (pokemonId: number) => () => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const typeEffectiveness = calcTypeMultiplier(pokemon.types);

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
        <Box sx={{ mt: "16px" }}>
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
            HP
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
            {pokemon.stats.hp}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(pokemon.stats.hp / MAX_STAT) * 100}
            sx={{
              flex: 1,
              width: 300,
              height: 10,
              borderRadius: 5,
              mt: "5px",
            }}
          />
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography variant="h5">
            こうげき
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
            {pokemon.stats.attack}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(pokemon.stats.attack / MAX_STAT) * 100}
            sx={{
              flex: 1,
              width: 300,
              height: 10,
              borderRadius: 5,
              mt: "5px",
            }}
          />
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography variant="h5">
            ぼうぎょ
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
            {pokemon.stats.defense}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(pokemon.stats.defense / MAX_STAT) * 100}
            sx={{
              flex: 1,
              width: 300,
              height: 10,
              borderRadius: 5,
              mt: "5px",
            }}
          />
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography variant="h5">
            とくこう
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
            {pokemon.stats.specialAttack}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(pokemon.stats.specialAttack / MAX_STAT) * 100}
            sx={{
              flex: 1,
              width: 300,
              height: 10,
              borderRadius: 5,
              mt: "5px",
            }}
          />
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography variant="h5">
            とくぼう
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
            {pokemon.stats.specialDefense}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(pokemon.stats.specialDefense / MAX_STAT) * 100}
            sx={{
              flex: 1,
              width: 300,
              height: 10,
              borderRadius: 5,
              mt: "5px",
            }}
          />
        </Box>
        <Box sx={{ mt: "16px" }}>
          <Typography variant="h5">
            すばやさ
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
            {pokemon.stats.speed}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(pokemon.stats.speed / MAX_STAT) * 100}
            sx={{
              flex: 1,
              width: 300,
              height: 10,
              borderRadius: 5,
              mt: "5px",
            }}
          />
        </Box>
        <Box sx={{ mt: "16px" }}>
          {typeEffectiveness.length > 0 && (
            <Box>
              <Typography variant="h5">
                タイプ相性
              </Typography>
              <Box sx={{ mt: "8px", pl: "16px" }}>
                {typeEffectiveness.map((type) => (
                  <Box key={type.type} sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    mt: "8px",
                  }}>
                    <Chip
                      label={typeData[type.type as keyof typeof typeData]?.ja || type}
                      sx={{
                        backgroundColor:
                          typeData[type.type as keyof typeof typeData]?.color || "#D3D3D3",
                        color: "#fff",
                        fontSize: "12px",
                        borderRadius: "4px",
                        width: "96px",
                        height: "24px",
                      }}
                    />
                    <Typography variant="body1" sx={{
                      color: type.multiplier > 1 ? "red" : type.multiplier === 0 ? "#999" : "blue",
                    }}>
                      ×{type.multiplier}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
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
        <Box sx={{ display: "flex", justifyContent: "center", mt: "16px" }}>
          <Button
            onClick={handleNavigate(pokemon.id)}
            color="inherit"
            sx={{
              borderWidth: 1,
              bgcolor: '#e20e22',
              color: '#fff',
              '&:hover': {
                bgcolor: '#990918',
              },
              px: '16px',
            }}
          >
            詳細を見る
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
