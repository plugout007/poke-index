import { Box } from '@mui/material';
import P from '../p';
import theme from '../../config/theme-config';
import { } from './styled';
import { Link } from 'react-router-dom';

/**
 * このコンポーネントはヘッダー要素を提供する
 */
export default function Header() {
  return (
    <Box
      component='header'
      sx={{
        position: 'fixed',
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
      <Link to="/" style={{ textDecoration: 'none' }}>
        <P v='h1' sx={{ color: theme.palette.basic.light }}>ポケモン図鑑</P>
      </Link>
    </Box>
  );
}
