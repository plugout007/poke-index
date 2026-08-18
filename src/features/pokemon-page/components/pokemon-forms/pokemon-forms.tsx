import { Box } from "@mui/material";
import BurmyForms from '../burmy-forms';
import CastformForms from '../castform-forms';
import UnownForms from '../unown-forms';
import { } from './styled';

type Props = {
  pokemonId: number;
};

/**
 * このコンポーネントはポケモンのフォーム画面全体の機能を提供する
 */
export default function PokemonForms({ pokemonId }: Props) {
  let content = null;

  switch (pokemonId) {
    case 201: // アンノーンのポケモンID
      content = <UnownForms />;
      break;
    case 351: // ポワルンのポケモンID
      content = <CastformForms />;
      break;
    case 412: // ミノムッチのポケモンID
      content = <BurmyForms />;
      break;
    default:
      return null;
  }

  return (
    <Box sx={{ mt: "24px" }}>
      {content}
    </Box>
  );
}
