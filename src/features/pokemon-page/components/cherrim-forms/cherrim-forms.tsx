import { Box, Typography } from "@mui/material";
import { } from './styled';

/**
 * このコンポーネントは id:421 チェリムのフォルム情報 画面全体の機能を提供する
 */
export default function CherrimForms() {
  const cherrimId = 421; // チェリムのポケモンID
  // formsから手動で取得
  const cherrimForms = [
    {
      name: "overcast",
      imageSuffix: "",
      formNameJa: "ネガフォルム",
    },
    {
      name: "sunshine",
      imageSuffix: "-sunshine",
      formNameJa: "ポジフォルム",
    },
  ];
  return (
    <>
      <Typography variant="h5">
        チェリムのフォルム情報
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 8, mt: '8px'}}>
        {cherrimForms.map((form) => (
          <Box key={form.name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
            <Typography variant="body1">
              {form.formNameJa}
            </Typography>
            <Box
              component='img'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${cherrimId}${form.imageSuffix}.png`}
              alt={`チェリム フォルム ${form.formNameJa}`}
              sx={{ mt: '4px'}}
            />
          </Box>
        ))}

      </Box>
    </>
  );
}
