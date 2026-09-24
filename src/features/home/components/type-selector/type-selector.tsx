import { Chip, Stack } from "@mui/material";
import { typeData } from "../../../../constants/pokemon";
import type { Dispatch, SetStateAction } from "react";
import { PokemonTypeName } from "../../../../types/pokemon";

type Props = {
  selected: PokemonTypeName[];
  setSelected: Dispatch<SetStateAction<PokemonTypeName[]>>;
  isOnlySingleType: boolean;
};
/**
 * このコンポーネントはxxx画面全体の機能を提供する
*/

export default function TypeSelector({ selected, setSelected, isOnlySingleType }: Props) {
  const MAX_SELECT = 2;
  const types = Object.entries(typeData) as [
    PokemonTypeName,
    typeof typeData[PokemonTypeName]
  ][];
  const toggle = (key: PokemonTypeName) => {
    setSelected((prev: PokemonTypeName[]) => {
      // 選択済みなら解除
      if(prev.includes(key)) {
        return prev.filter((t) => t !== key);
      }

      // MAX_SELECTまで
      if (prev.length >= MAX_SELECT) {
        return prev;
      }

      return [...prev, key]
    });
  };

  return (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      {types.map(([key, value]) => (
        <Chip
          key={key}
          label={value.ja}
          onClick={() => toggle(key)}
          sx={{
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",

            bgcolor: selected.includes(key)
              ? value.color
              : "#fff",

            color: selected.includes(key)
              ? "#fff"
              : "#333",

            border: selected.includes(key)
              ? `2px solid ${value.color}`
              : "2px solid #ddd",

            "&:hover": {
              transform: "scale(1.05)",
              color: "#fff",
              bgcolor: value.color,
              borderColor: value.color,
            },

            mr: '5px',
            mb: '5px',
          }}
          disabled={
            !selected.includes(key) &&
            (
              selected.length >= MAX_SELECT ||
              (isOnlySingleType && selected.length >= 1)
            )
          }
        />
      ))}
    </Stack>
  );
}