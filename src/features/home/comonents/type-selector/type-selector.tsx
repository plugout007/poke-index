import { Chip, Stack } from "@mui/material";
import { typeData } from "../../../../constants/pokemon";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
};
/**
 * このコンポーネントはxxx画面全体の機能を提供する
*/

export default function TypeSelector({ selected, setSelected }: Props) {
  const types = Object.entries(typeData);
  const toggle = (key: string) => {
    setSelected((prev: string[]) =>
      prev.includes(key)
        ? prev.filter(t => t !== key)
        : [...prev, key]
    );
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
        />
      ))}
    </Stack>
  );
}