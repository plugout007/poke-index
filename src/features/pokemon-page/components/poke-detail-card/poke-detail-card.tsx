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
import { Pokemon, PokemonEvolutionEdge, PokemonRegion } from "../../../../types/pokemon";
import { typeData } from "../../../../constants/pokemon";
import { useEffect, useRef, useState } from "react";
import {
  getEvolutionEdges,
  getNextEvolutionPokemonIds,
  getPokemonRegions,
  getPreviousEvolutionPokemonId,
  hasPokemonInEdges,
} from "../../../../api/pokeApi";

type Props = {
  pokemon: Pokemon;
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function PokeDetailCard({ pokemon }: Props) {
  const [isShiny, setIsShiny] = useState(false);
  const [edges, setEdges] = useState<PokemonEvolutionEdge[]>([]);
  const [regions, setRegions] = useState<PokemonRegion[]>([]);
  const imageUrl =
    isShiny && pokemon.shinyImageUrl ? pokemon.shinyImageUrl : pokemon.imageUrl;

  const pokemonImageUrl = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const edgesRef = useRef<PokemonEvolutionEdge[]>([]);

  useEffect(() => {
    const fetchEvolutionEdges = async () => {
      if (hasPokemonInEdges(pokemon.id, edgesRef.current)) {
        setEdges(edgesRef.current);
        return;
      };

      const evolutionEdges = await getEvolutionEdges(pokemon.id);

      edgesRef.current = evolutionEdges;

      setEdges(evolutionEdges);
    };
    fetchEvolutionEdges();
    const fetchedRegions = async () => {
      const regions = await getPokemonRegions(pokemon.id);
      setRegions(regions);
    };
    fetchedRegions();
  }, [pokemon.id]);
  console.log(regions);


  const prevEvolutionId = getPreviousEvolutionPokemonId(pokemon.id, edges);
  const nextEvolutionIds = getNextEvolutionPokemonIds(pokemon.id, edges) || [];

  return (
    <Card sx={{ maxWidth: 768, margin: 2, bgcolor: "background.paper" }}>
      <CardContent>
        <Typography variant="h4" component="div" sx={{ mt: "5px" }}>
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: "5px" }}>
          {pokemon.genus}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
        <Box>
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
        <Typography variant="body2" color="text.secondary" sx={{ mt: "5px" }}>
          特性: {pokemon.abilities.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: "10px" }}>
          説明: {pokemon.flavorText}
        </Typography>
        {prevEvolutionId && (
          <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: "10px" }}>
                進化前
              </Typography>
              <Link to={`/pokemon/${prevEvolutionId.linkId}`} style={{ textDecoration: "none" }}>
                <img  src={pokemonImageUrl(prevEvolutionId.imageId)} />
              </Link>
            </Box>
        )}
        {nextEvolutionIds.length > 0 && (
          <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: "10px" }}>
                進化後
              </Typography>
              {nextEvolutionIds.map((id) => (
                <Link key={id} to={`/pokemon/${id}`} style={{ textDecoration: "none" }}>
                  <img  src={pokemonImageUrl(id)} />
                </Link>
              ))}
            </Box>
        )}
        {regions.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: "10px" }}>
              リージョンフォーム
            </Typography>
            {regions.map((region) => (
              <Box>
                <Typography key={region.region} variant="body2" color="text.secondary">
                  {region.region}
                </Typography>
                <img  src={pokemonImageUrl(region.baseFormId)} />
              </Box>
            ))}
          </Box>
        )}
        {/* {pokemon.varietiesUrl.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
              {pokemon.name}のリージョンフォーム
            </Typography>
            {pokemon.varietiesUrl.map((img) => (
              img ? <img src={img} alt={pokemon.name} key={img} /> : null
            ))}
          </Box>
        )} */}
      </CardContent>
    </Card>
  );
}
