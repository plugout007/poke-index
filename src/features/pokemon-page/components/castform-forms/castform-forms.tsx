import { Box, Typography } from "@mui/material";
import { } from './styled';

/**
 * このコンポーネントは id:351 ポワルンのフォルム情報 画面全体の機能を提供する
 */
export default function CastformForms() {
  // speciesのvarietiesから手動で取得
  const castformForms = [
    {
      id: 351,
      name: "castform",
      formNameJa: "ポワルンのすがた",
    },
    {
      id: 10013,
      name: "castform-sunny",
      formNameJa: "たいようのすがた",
    },
    {
      id: 10014,
      name: "castform-rainy",
      formNameJa: "あまみずのすがた",
    },
    {
      id: 10015,
      name: "castform-snowy",
      formNameJa: "ゆきぐものすがた",
    },
  ];
  return (
    <>
      <Typography variant="h5">
        ポワルンのフォルム情報
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 8, mt: '8px'}}>
        {castformForms.map((form) => (
          <Box key={form.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
            <Typography variant="body1">
              {form.formNameJa}
            </Typography>
            <Box
              component='img'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.id}.png`}
              alt={`ポワルン フォルム ${form.formNameJa}`}
              sx={{ mt: '4px'}}
            />
          </Box>
        ))}

      </Box>
    </>
  );
}
