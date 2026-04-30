import { Box, Typography } from '@mui/material';
import theme from '../../config/theme-config';

/**
 * このコンポーネントはフッター要素を提供する
 */
export default function Footer() {
  return (
    <>
      <Box
        component='footer'
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '4rem',
          bgcolor: '#e20e22',
          boxShadow: 1,
          py: 2,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ fontSize: 12 ,color: theme.palette.basic.light }}
        >
          Copyright (C) 2024 poke index
        </Typography>
      </Box>
    </>
  );
}
