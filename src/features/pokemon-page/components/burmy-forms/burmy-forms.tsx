import { Box, Typography } from "@mui/material";
import { } from './styled';

/**
 * このコンポーネントは id:412 ミノムッチのフォルム情報 画面全体の機能を提供する
 */
export default function BurmyForms() {
  const burmyId = 412; // ミノムッチのポケモンID
  // formsから手動で取得
  const burmyForms = [
    {
      name: "plant",
      imageSuffix: "",
      formNameJa: "くさきのミノ",
    },
    {
      name: "sandy",
      imageSuffix: "-sandy",
      formNameJa: "すなちのミノ",
    },
    {
      name: "trash",
      imageSuffix: "-trash",
      formNameJa: "ゴミのミノ",
    },
  ];
  return (
    <>
      <Typography variant="h5">
        ミノムッチのフォルム情報
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 8, mt: '8px'}}>
        {burmyForms.map((form) => (
          <Box key={form.name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
            <Typography variant="body1">
              {form.formNameJa}
            </Typography>
            <Box
              component='img'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${burmyId}${form.imageSuffix}.png`}
              alt={`ミノムッチ フォルム ${form.formNameJa}`}
              sx={{ mt: '4px'}}
            />
          </Box>
        ))}

      </Box>
    </>
  );
}
