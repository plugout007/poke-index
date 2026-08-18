import { Box, Typography } from "@mui/material";
import { } from './styled';

/**
 * このコンポーネントは id:413 ミノマダムのフォルム情報 画面全体の機能を提供する
 */
export default function WormadamForms() {
  // speciesのvarietiesから手動で取得
  const wormadamForms = [
    {
      id: 413,
      name: "wormadam-plant",
      formNameJa: "くさきのミノ",
    },
    {
      id: 10004,
      name: "wormadam-sandy",
      formNameJa: "すなちのミノ",
    },
    {
      id: 10005,
      name: "wormadam-wormadam-trash",
      formNameJa: "ゴミのミノ",
    },
  ]
  return (
    <>
      <Typography variant="h5">
        ミノマダムのフォルム情報
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 8, mt: '8px'}}>
        {wormadamForms.map((form) => (
          <Box key={form.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
            <Typography variant="body1">
              {form.formNameJa}
            </Typography>
            <Box
              component='img'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.id}.png`}
              alt={`ミノマダム フォルム ${form.formNameJa}`}
              sx={{ mt: '4px'}}
            />
          </Box>
        ))}

      </Box>
    </>
  );
}
