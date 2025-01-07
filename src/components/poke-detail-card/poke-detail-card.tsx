import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { Pokemon } from '../../types/pokemon';
import { } from './styled';

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
export default function PokeDetailCard({ pokemon }: Props) {
  return (
    <Card sx={{ maxWidth: 768, margin: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h4" component="div" sx={{mt: '5px'}}>
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: '5px'}}>
          {pokemon.genus}
        </Typography>
        {/* TODO:imgタグではなくMUIに準ずる書き方にする */}
        <img src={pokemon.imageUrl} alt={pokemon.name} />
        <Typography variant="body2" color="text.secondary" sx={{mt: '5px'}}>
          No.{pokemon.id} たかさ {pokemon.height}m おもさ {pokemon.weight}kg
        </Typography>
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
        <Typography variant="body2" color="text.secondary" sx={{mt: '5px'}}>
          特性: {pokemon.abilities.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
          説明: {pokemon.flavorText}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
          最初のポケモン: {pokemon.evolutionChainSeed}
        </Typography>
        <img src={pokemon.evolutionChainSeedImg} alt={pokemon.evolutionChainSeed} />
        {pokemon.evolutionChainFirst && pokemon.evolutionChainFirst.length > 0 ? (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mt: '10px' }}>
              第一進化先ポケモン: {pokemon.evolutionChainFirstStage.map(pokemon => pokemon.name).join(', ')}
            </Typography>
            {pokemon.evolutionChainFirstStage.map((img) => (
              <img src={img.imageUrl} key={img.name} alt={img.name} />
            ))}
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: '10px' }}>
            このポケモンは進化しません。
          </Typography>
        )}
        {pokemon.evolutionChainSecond.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
              第二進化先ポケモン: {pokemon.evolutionChainSecondStage.map(pokemon => pokemon.name).join(', ')}
            </Typography>
            {pokemon.evolutionChainSecondStage.map((img) => (
              <img src={img.imageUrl} key={img.name} alt={img.name} />
            ))}
          </>
        )}
        {pokemon.varietiesUrl.length > 0 && (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
              {pokemon.name}のリージョンフォーム
            </Typography>
            {pokemon.varietiesUrl.map((img) => (
              img ? <img src={img} alt={pokemon.name} key={img} /> : null
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
