import { Card, CardContent, Typography } from '@mui/material';
import { Pokemon } from '../../types/pokemon';
import { } from './styled';

type Props = {
  pokemon: Pokemon;
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
        <Typography variant="body2" color="text.secondary" sx={{mt: '5px'}}>
          タイプ: {pokemon.types.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: '5px'}}>
          特性: {pokemon.abilities.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
          説明: {pokemon.flavorText}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
          最初のポケモン: {pokemon.evolutionChainSeed}
        </Typography>
        {pokemon.evolutionChainFirst && pokemon.evolutionChainFirst.length > 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: '10px' }}>
            第一進化先ポケモン: {pokemon.evolutionChainFirst.join(', ')}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: '10px' }}>
            このポケモンは進化しません。
          </Typography>
        )}
        {pokemon.evolutionChainSecond.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
            第二進化先ポケモン: {pokemon.evolutionChainSecond.join(', ')}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
