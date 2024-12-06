import { Box } from '@mui/material';
import { } from './styled';

type Props = {
  id: number;
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function EvolutionChain({ id }: Props) {
  const data = fetchPokemonEvolutionChain(id);
  return (
    <Box></Box>
  );
}
