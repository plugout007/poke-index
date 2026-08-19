import { Box, Typography } from "@mui/material";
import { } from './styled';

/**
 * このコンポーネントは id:422 カラナクシのフォルム情報 画面全体の機能を提供する
 */
export default function ShellosForms() {
  const shellosId = 422; // カラナクシのポケモンID
  // formsから手動で取得
  const shellosForms = [
    {
      name: "west",
      imageSuffix: "",
      formNameJa: "にしのうみ",
    },
    {
      name: "east",
      imageSuffix: "-east",
      formNameJa: "ひがしのうみ",
    },
  ];
  return (
    <>
      <Typography variant="h5">
        カラナクシのフォルム情報
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 8, mt: '8px'}}>
        {shellosForms.map((form) => (
          <Box key={form.name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
            <Typography variant="body1">
              {form.formNameJa}
            </Typography>
            <Box
              component='img'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${shellosId}${form.imageSuffix}.png`}
              alt={`カラナクシ フォルム ${form.formNameJa}`}
              sx={{ mt: '4px'}}
            />
          </Box>
        ))}

      </Box>
    </>
  );
}
