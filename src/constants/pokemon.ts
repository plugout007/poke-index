/** ポケモンのタイプデータ */
export const typeData = {
  fire: { ja: "ほのお", color: "#F08030" },
  water: { ja: "みず", color: "#6890F0" },
  grass: { ja: "くさ", color: "#78C850" },
  electric: { ja: "でんき", color: "#F8D030" },
  ice: { ja: "こおり", color: "#98D8D8" },
  fighting: { ja: "かくとう", color: "#C03028" },
  poison: { ja: "どく", color: "#A040A0" },
  ground: { ja: "じめん", color: "#E0C068" },
  flying: { ja: "ひこう", color: "#A890F0" },
  psychic: { ja: "エスパー", color: "#F85888" },
  bug: { ja: "むし", color: "#A8B820" },
  rock: { ja: "いわ", color: "#B8A038" },
  ghost: { ja: "ゴースト", color: "#705898" },
  dragon: { ja: "ドラゴン", color: "#7038F8" },
  dark: { ja: "あく", color: "#705848" },
  steel: { ja: "はがね", color: "#B8B8D0" },
  fairy: { ja: "フェアリー", color: "#EE99AC" },
  normal: { ja: "ノーマル", color: "#A8A878" },
} as const;

/** ポケモンのリージョンデータ */
export const regionData = {
  alola: { ja: "アローラ" },
  galar: { ja: "ガラル" },
  hisui: { ja: "ヒスイ" },
  paldea: { ja: "パルデア" },
} as const;

/** リージョンパターン */
export const regionPatterns = {
  alola: /-alola$/,
  galar: /-galar-/,
  hisui: /-hisui$/,
  paldea: /-paldea-/,
} as const;

/** 除外パターン */
export const excludedPatterns = [
  /-mega/,         // メガシンカ
  /-gmax/,         // 巨大マックス
  /-totem-/,       // ヌシポケモン
  /-cap$/,         // No.25 ピカチュウのキャップ着用
  /-zen/,          // No.555 ヒヒダルマのダルマモード
];

/** メガシンカパターン */
export const megaEvolutionPatterns = [
  /-mega/,
  /-mega-x/,
  /-mega-y/,
  /-mega-z/,
];

/** 現在のポケモンの種類の総数 */
export const POKE_INDEX_ID_MAX = 1025;