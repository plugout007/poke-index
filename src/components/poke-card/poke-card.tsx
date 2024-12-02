import { Card, CardContent, Typography } from '@mui/material';
import { Pokemon } from '../../types/pokemon';
import { } from './styled';

type Props = {
  pokemon: Pokemon;
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function PokeCard({ pokemon }: Props) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pokemon.genus}
        </Typography>
        {/* TODO:imgタグではなくMUIに準ずる書き方にする */}
        <img src={pokemon.imageUrl} alt={pokemon.name} />
        <Typography variant="body2" color="text.secondary">
          No.{pokemon.id} たかさ {pokemon.height}m おもさ {pokemon.weight}kg
        </Typography>
        <Typography variant="body2" color="text.secondary">
          タイプ: {pokemon.types.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          説明: {pokemon.flavorText}
        </Typography>
      </CardContent>
    </Card>
  );
}
