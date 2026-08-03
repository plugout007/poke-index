import {
  Box,
  Card,
  CardContent,
  Chip,
  Switch,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Link } from "react-router-dom";
import { Pokemon } from "../../../../types/pokemon";
import { typeData } from "../../../../constants/pokemon";
import { useState } from "react";
import {
  getNextEvolutionPokemonIds,
  getPreviousEvolutionPokemonId,
} from "../../../../api/pokeApi";

type Props = {
  pokemon: Pokemon;
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function PokeDetailCard({ pokemon }: Props) {
  const [isShiny, setIsShiny] = useState(false);
  const imageUrl =
    isShiny && pokemon.shinyImageUrl ? pokemon.shinyImageUrl : pokemon.imageUrl;

  const pokemonImageUrl = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const prevEvolutionId = getPreviousEvolutionPokemonId(pokemon.id, pokemon.evolutionEdge);
  const nextEvolutionIds = getNextEvolutionPokemonIds(pokemon.id, pokemon.evolutionEdge) || [];

  console.log(pokemon);

  return (
    <Card sx={{ maxWidth: 768, margin: 2, bgcolor: "background.paper" }}>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: "5px" }}>
          <Switch
            checked={isShiny}
            onChange={(e) => setIsShiny(e.target.checked)}
            disabled={!pokemon.shinyImageUrl}
          />
          <AutoAwesomeIcon
            sx={{
              color: isShiny ? "gold" : "grey.400",
            }}
          />
        </Box>
        <Box
          component="img"
          src={imageUrl}
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
        <Box sx={{ display: "flex", mt: "16px", columnGap: "16px" }}>
          <Box sx={{ width: '50%' }}>
            <Typography variant="h5">
              たかさ
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
              {pokemon.height}m
            </Typography>
          </Box>
          <Box sx={{ width: '50%' }}>
            <Typography variant="h5">
              おもさ
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
              {pokemon.weight}kg
            </Typography>
          </Box>
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
            <Typography variant="h5">
              説明
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
              {pokemon.flavorText}
            </Typography>
        </Box>
        {prevEvolutionId && (
          <Box sx={{ mt: "16px" }}>
              <Typography variant="h5">
                進化前
              </Typography>
              <Link to={`/pokemon/${prevEvolutionId.linkId}`} style={{ textDecoration: "none" }}>
                <img  src={pokemonImageUrl(prevEvolutionId.imageId)} />
              </Link>
          </Box>
        )}
        {nextEvolutionIds.length > 0 && (
          <Box sx={{ mt: "16px" }}>
              <Typography variant="h5">
                進化後
              </Typography>
              {nextEvolutionIds.map((id) => (
                <Link key={id} to={`/pokemon/${id}`} style={{ textDecoration: "none" }}>
                  <img  src={pokemonImageUrl(id)} />
                </Link>
              ))}
            </Box>
        )}
        {pokemon.regions.length > 0 && (
          <Box sx={{ mt: "16px" }}>
            <Typography variant="h5">
              リージョンフォーム
            </Typography>
            {pokemon.regions.map((region, i) => (
              <Box key={i} sx={{ mt: "5px" }}>
                <Typography variant="body2" color="text.secondary">
                  {region.region}
                </Typography>
                <img src={pokemonImageUrl(region.baseFormId)} />
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
