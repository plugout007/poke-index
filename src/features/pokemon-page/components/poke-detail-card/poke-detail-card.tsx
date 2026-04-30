import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { Pokemon } from '../../../../types/pokemon';
import { typeData } from '../../../../constants/pokemon';

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
        <Box>
          {pokemon.types.map((type) => (
            <Chip
            key={type}
            label={typeData[type as keyof typeof typeData]?.ja || type}
            sx={{
              margin: "5px",
              backgroundColor: typeData[type as keyof typeof typeData]?.color || "#D3D3D3",
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
        {/* <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
          最初のポケモン: {pokemon.evolutionChainSeed}
        </Typography>
        <img src={pokemon.evolutionChainSeedImg} alt={pokemon.evolutionChainSeed} /> */}
        {/* {pokemon.evolutionChainFirst && pokemon.evolutionChainFirst.length > 0 ? (
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
        )} */}
        {/* {pokemon.evolutionChainSecond.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{mt: '10px'}}>
              第二進化先ポケモン: {pokemon.evolutionChainSecondStage.map(pokemon => pokemon.name).join(', ')}
            </Typography>
            {pokemon.evolutionChainSecondStage.map((img) => (
              <img src={img.imageUrl} key={img.name} alt={img.name} />
            ))}
          </>
        )} */}
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
