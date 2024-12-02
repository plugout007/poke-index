import { Variant } from '../../types/common';
import { } from './styled';
import { SxProps, Typography } from '@mui/material';
import { ReactNode, memo } from 'react';

// @mui/material/styles/createTypography ではなく、独自で管理する
type Props = {
  /** このプロジェクトで使用される MUI Typography の variant の型 */
  v?: Variant;
  sx?: SxProps;
  children?: ReactNode;
};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
function P({ v = 'body1', sx, children }: Props) {
  return (
    <Typography variant={v} sx={sx}>
      {children}
    </Typography>
  );
}
export default memo(P);