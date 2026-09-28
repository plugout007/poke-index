/**
 * 表示用のポケモン名を取得する
 * @param id ポケモンID
 * @param pokemonName ポケモン名
 * @param formName フォルム名
 * @returns 表示用のポケモン名
 */
export const getDisplayPokemonName = (id: number, pokemonName: string, formName: string) => {
  if (formName?.includes('メガ')) {
    return formName;
  } else if (id === 201) {
    // アンノーン
    return `${pokemonName}`;
  } else if (id === 10116) {
    // ゲッコウガ（きずなへんげ）
    return `${pokemonName} (きずなへんげ)`;
  } else if (id === 10118) {
    // ジガルデ (１０％フォルム・スワームチェンジ)
    return `${pokemonName} (１０％フォルム・スワームチェンジ)`;
  } else if (id === 10119) {
    // ジガルデ (５０％フォルム・スワームチェンジ)
    return `${pokemonName} (５０％フォルム・スワームチェンジ)`;
  } else if (id === 10151) {
    // イワンコ (マイペース)
    return `${pokemonName} (マイペース)`;
  } else if (id === 10178) {
    // ヒヒダルマ (ガラルのすがた・ダルマモード)
    return `${pokemonName} (ガラルのすがた・ダルマモード)`;
  } else if (id === 10250) {
    // ケンタロス (パルデアのすがた・コンバットしゅ)
    return `${pokemonName} (パルデアのすがた・コンバットしゅ)`;
  } else if (id === 10251) {
    // ケンタロス (パルデアのすがた・ブレイズしゅ)
    return `${pokemonName} (パルデアのすがた・ブレイズしゅ)`;
  } else if (id === 10252) {
    // ケンタロス (パルデアのすがた・ウォーターしゅ)
    return `${pokemonName} (パルデアのすがた・ウォーターしゅ)`;
  } else if (formName) {
    return `${pokemonName} (${formName})`;
  } else if (pokemonName) {
    return pokemonName;
  } else {
    return 'データが存在しません';
  }
}