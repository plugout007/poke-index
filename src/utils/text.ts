/**
 * ひらがなをカタカナに変換する関数
 */
export const hiraToKata = (str: string) => {
  return str.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
};

/**
 * 検索用に文字列を正規化する関数
 * 
 * - ひらがな → カタカナ変換
 * - NFKCで全角半角を統一
 * - 英字を小文字化
 * @param str 
 * @returns 
 */
export const normalizeText = (str: string) => {
  return hiraToKata(str)
    .normalize("NFKC")
    .toLowerCase();
};