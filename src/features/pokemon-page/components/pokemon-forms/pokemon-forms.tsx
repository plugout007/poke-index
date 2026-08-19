import { Box } from "@mui/material";
import BurmyForms from '../burmy-forms';
import CastformForms from '../castform-forms';
import UnownForms from '../unown-forms';
import WormadamForms from "../wormadam-forms";
import CherrimForms from "../cherrim-forms";
import DeoxysForms from "../deoxys-forms";
import ShellosForms from "../shellos-forms";
import GastrodonForms from "../gastrodon-forms";

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
    case 386: // デオキシスのポケモンID
      content = <DeoxysForms />;
      break;
    case 412: // ミノムッチのポケモンID
      content = <BurmyForms />;
      break;
    case 413: // ミノマダムのポケモンID
      content = <WormadamForms />;
      break;
    case 421: // チェリムのポケモンID
      content = <CherrimForms />
      break;
    case 422: // カラナクシのポケモンID
      content = <ShellosForms />
      break;
    case 423: // トリトドンのポケモンID
      content = <GastrodonForms />
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
