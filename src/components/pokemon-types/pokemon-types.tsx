import { Chip } from "@mui/material";
import { PokemonTypeName } from '../../types/pokemon';
import { typeData } from "../../constants/pokemon";

type Props = {
  types: PokemonTypeName[];
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function PokemonTypes({ types }: Props) {
  return (
    <>
      {types.map((type) => (
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
    </>
  );
}
