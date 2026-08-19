import { Box, Typography } from "@mui/material";

/**
 * このコンポーネントは id:423 トリトドンのフォルム情報 画面全体の機能を提供する
 */
export default function GastrodonForms() {
  const gastrodonId = 423; // トリトドンのポケモンID
  // formsから手動で取得
  const gastrodonForms = [
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
        トリトドンのフォルム情報
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 8, mt: '8px'}}>
        {gastrodonForms.map((form) => (
          <Box key={form.name} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
            <Typography variant="body1">
              {form.formNameJa}
            </Typography>
            <Box
              component='img'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${gastrodonId}${form.imageSuffix}.png`}
              alt={`トリトドン フォルム ${form.formNameJa}`}
              sx={{ mt: '4px'}}
            />
          </Box>
        ))}

      </Box>
    </>
  );
}
