import { Box, Typography } from "@mui/material";
import { } from './styled';

/**
 * このコンポーネントは id:201 アンノーンのフォルム情報 画面全体の機能を提供する
 */
export default function UnownForms() {
  const unownId = 201; // アンノーンのポケモンID

  const unownForms = [];
  for (let i = 0; i < 26; i++) {
    const form = String.fromCharCode(97 + i);
    unownForms.push({
      form,
      imageSuffix: form === 'a' ? '' : `-${form}`,
    });
  }

  unownForms.push(
    { form: "!", imageSuffix: "-exclamation" },
    { form: "?", imageSuffix: "-question" },
  );

  return (
    <>
      <Typography variant="h5">
        アンノーンのフォルム情報
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 8, mt: '8px'}}>
        {unownForms.map(({form, imageSuffix}) => (
          <Box key={form} sx={{ width: '96px' }}>
            <Typography variant="body1" sx={{ textAlign: 'center'}}>
              {form.toUpperCase()}
            </Typography>
            <Box
              component='img'
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${unownId}${imageSuffix}.png`}
              alt={`アンノーン フォルム ${form.toUpperCase()}`}
              sx={{ mt: '4px'}}
            />
          </Box>
        ))}

      </Box>
    </>
  );
}
