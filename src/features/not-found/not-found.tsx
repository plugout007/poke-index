import P from '../../components/p';
import theme from '../../config/theme-config';
import { } from './styled';

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function NotFound() {
  return (
    <>
      <P v='h2' sx={{ mt: 20 ,fontSize: 28, color: theme.palette.basic.dark }}>404 Not Found</P>
      <P v='body1' sx={{ mt: 12, color: theme.palette.basic.dark }}>ページが見つかりませんでした</P>
    </>
  );
}
