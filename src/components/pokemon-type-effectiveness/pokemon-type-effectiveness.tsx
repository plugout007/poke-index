import { Box, Chip, Typography } from "@mui/material";
import { typeData } from "../../constants/pokemon";
import { PokemonTypeName } from '../../types/pokemon';
import { calcTypeMultiplier } from '../../utils/calcTypeMultiplier';
import { } from './styled';

type Props = {
  types: PokemonTypeName[];
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function PokemonTypeEffectiveness({ types }: Props) {
  const typeEffectiveness = calcTypeMultiplier(types);

  return (
    <>
      {typeEffectiveness.length > 0 && (
        <Box>
          <Typography variant="h5">
            タイプ相性
          </Typography>
          <Box sx={{ mt: "8px", pl: "16px" }}>
            {typeEffectiveness.map((type) => (
              <Box key={type.type} sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                mt: "8px",
              }}>
                <Chip
                  label={typeData[type.type]?.ja || type}
                  sx={{
                    backgroundColor:
                      typeData[type.type]?.color || "#D3D3D3",
                    color: "#fff",
                    fontSize: "12px",
                    borderRadius: "4px",
                    width: "96px",
                    height: "24px",
                  }}
                />
                <Typography variant="body1" sx={{
                  color: type.multiplier > 1 ? "red" : type.multiplier === 0 ? "#666" : "blue",
                }}>
                  {type.multiplier === 0 ? "無効" : `×${type.multiplier}`}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
