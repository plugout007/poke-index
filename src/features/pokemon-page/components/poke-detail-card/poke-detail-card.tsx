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

  return (
    <Card sx={{ maxWidth: 768, margin: 2, bgcolor: "background.paper" }}>
      <CardContent>
        <Typography variant="h3" component="div" sx={{ mt: "5px" }}>
          {pokemon.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: "5px" }}>
          {pokemon.genus}
        </Typography>
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
        <Typography variant="body2" color="text.secondary" sx={{ mt: "5px" }}>
          No.{pokemon.id.toString().padStart(4, "0")} たかさ {pokemon.height}m
          おもさ {pokemon.weight}kg
        </Typography>
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
        <Box sx={{ mt: "10px" }}>
            <Typography variant="h6">
              特性
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: "5px" }}>
              {pokemon.abilities
                .map((ability) =>
                  ability.isHidden ? `${ability.name}(隠れ)` : ability.name
                )
                .join(" / ")
              }
            </Typography>
        </Box>
        <Box sx={{ mt: "10px" }}>
            <Typography variant="h6">
              説明
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: "5px" }}>
              {pokemon.flavorText}
            </Typography>
        </Box>
        {prevEvolutionId && (
          <Box sx={{ mt: "5px" }}>
              <Typography variant="h6" sx={{ mt: "10px" }}>
                進化前
              </Typography>
              <Link to={`/pokemon/${prevEvolutionId.linkId}`} style={{ textDecoration: "none" }}>
                <img  src={pokemonImageUrl(prevEvolutionId.imageId)} />
              </Link>
          </Box>
        )}
        {nextEvolutionIds.length > 0 && (
          <Box sx={{ mt: "5px" }}>
              <Typography variant="h6" sx={{ mt: "10px" }}>
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
          <Box sx={{ mt: "5px" }}>
            <Typography variant="h6" sx={{ mt: "10px" }}>
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
