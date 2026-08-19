import { Box, Typography } from "@mui/material";
import { } from './styled';

/**
 * このコンポーネントはid:386 デオキシスのフォルム情報 画面全体の機能を提供する
 */
export default function DeoxysForms() {
  // speciesのvarietiesから手動で取得
  const deoxysForms = [
    {
      id: 386,
      name: "deoxys-normal",
      formNameJa: "ノーマルフォルム",
    },
    {
      id: 10001,
      name: "deoxys-attack",
      formNameJa: "アタックフォルム",
    },
    {
      id: 10002,
      name: "deoxys-defense",
      formNameJa: "ディフェンスフォルム",
    },
    {
      id: 10003,
      name: "deoxys-speed",
      formNameJa: "スピードフォルム",
    },
  ];
  return (
    <>
      <Typography variant="h5">
        デオキシスのフォルム情報
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 8, mt: '8px'}}>
        {deoxysForms.map((form) => (
          <Box key={form.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '160px' }}>
            <Typography variant="body1">
              {form.formNameJa}
            </Typography>
            <Box
              component='img'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.id}.png`}
              alt={`デオキシス フォルム ${form.formNameJa}`}
              sx={{ mt: '4px'}}
            />
          </Box>
        ))}

      </Box>
    </>
  );
}
