import { useMediaQuery, useTheme } from "@mui/material";

/**
 * Break Point
 * sp: ~767px
 * tb: 768px~1023px
 * pc: 1024px~
 */

/**
 * 画面サイズがSP向け（'md' 以下）のサイズかどうかを判定するカスタムフック
 * 
 * このフックは、画面サイズが指定されたブレークポイント（'md' 以下）かどうかをチェックし、
 * それに応じて boolean 値を返します。
 * 通常、'md' 以下はスマートフォンサイズと見なされます。
 * 
 * @returns {boolean} 画面がSPサイズかどうかを示す真偽値
 */
export function useIsSpSize() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}

/**
 * 画面サイズがTablet向け（'md' 以上'lg'以下）のサイズかどうかを判定するカスタムフック
 * 
 * このフックは、画面サイズが指定されたブレークポイント（'md' 以上'lg'以下）かどうかをチェックし、
 * それに応じて boolean 値を返します。
 * 通常、'md' 以上、'lg' 以下はタブレットサイズとして使われます。
 * 
 * @returns {boolean} 画面がTabletサイズかどうかを示す真偽値
 */
export function useIsTabSize() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  return isMdUp && isLgDown;
}

/**
 * 画面サイズがPC向け（'lg' 以上）のサイズかどうかを判定するカスタムフック
 * 
 * このフックは、画面サイズが指定されたブレークポイント（'lg' 以上）かどうかをチェックし、
 * それに応じて boolean 値を返します。
 * 通常、'lg' 以上はデスクトップやPC向けのサイズです。
 * 
 * @returns {boolean} 画面がPCサイズかどうかを示す真偽値
 */
export function useIsPcSize() {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up('lg'));
}