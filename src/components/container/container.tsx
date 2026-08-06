import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { } from './styled';
import { useIsSpSize } from '../../hooks/media-query';

type Props = {
  children: ReactNode;
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function Container({ children }: Props) {
  const isSpSize = useIsSpSize();
  return (
    <Box
      sx={{
        px: isSpSize ? '32px' : '64px',
        py: '64px',
      }}
    >
        {children}
    </Box>
  );
}
