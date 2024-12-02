import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { } from './styled';
import Container from '../container';
import Footer from '../footer';
import Header from '../header';
import { useIsSpSize } from '../../hooks/media-query';

type Props = {
  /** ヘッダーに表示されるタイトル */
  title?: string;
  children: ReactNode
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function Layout({ children}: Props) {
  // SPサイズかどうか？
  const isSpSize = useIsSpSize();
  return (
    <>
      <div>
        <Box
          sx={{
            mb: '55px',
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#fcffe6',
            borderRadius: isSpSize ? '0px' : '10px',
            overflowX: isSpSize ? 'hidden' : 'unset',
          }}
        >
          <Header />
          <Box>
            <Container>
              {children}
            </Container>
          </Box>
          <Footer />
        </Box>
      </div>
    </>
  );
}
