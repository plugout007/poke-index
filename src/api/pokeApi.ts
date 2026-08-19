import axios from "axios";
import {
  FetchPokemonSpecies,
  Pokemon,
  PokemonTypeLangData,
  PokemonFlavorTextLangData,
  ChainLink,
  PokemonEvolutionEdge,
  PokemonRegion,
  PokemonVariety,
  MegaPokemon,
} from "../types/pokemon";
import { API_BASE_URL } from "../config/api-config";
import { LANG } from "../config/app-config";
import { excludedPatterns, regionData } from "../constants/pokemon";

/**
 * PokeAPI の進化チェーン(木構造)を
 * UIで扱いやすい EvolutionEdge[] に変換する
 *
 */
export const convertEvolutionChainToEdges = (
  chain: ChainLink
): PokemonEvolutionEdge[] => {
  // 変換後の進化データを格納する配列
  const edges: PokemonEvolutionEdge[] = [];

  /**
   * 進化チェーンを再帰的に巡回する
   *
   * node:
   * 現在見ているポケモン
   *
   * evolves_to:
   * 次に進化するポケモン一覧
   *
   * 再帰的に walk() を呼ぶことで
   * ツリー全体を探索する
   */
  const walk = (node: ChainLink) => {
    // 現在のポケモンID
    const fromId = extractIdFromUrl(
      node.species.url
    );

    // 次の進化先を順番に処理
    for (const next of node.evolves_to) {
      // 進化先ポケモンID
      const toId = extractIdFromUrl(
        next.species.url
      );

      // 進化条件
      const detail = next.evolution_details[0];

      // edge形式へ変換
      edges.push({
        fromId: fromId,
        toId: toId,
        baseFormId: detail.base_form?.url ? extractIdFromUrl(detail.base_form.url)
          : fromId,
      });

      // さらに次の進化先を探索
      walk(next);
    }
  }

  // 進化ツリーの探索開始
  walk(chain);

  return edges;
};

/**
 * 指定したポケモンの進化前IDを取得する
 */
export const getPreviousEvolutionPokemonId =  (id: number, edges: PokemonEvolutionEdge[]) => {
  // 現在のポケモンが進化先(toId)にあるエッジを探す
  const edge = edges.find((e) => e.toId === id);
  if (!edge) return null;
  // TODO: リージョンフォーム用ページを作る前の暫定処理。画像はリージョンだがリンクは原種
  return {
    linkId: edge.fromId,
    imageId: edge.fromId === edge.baseFormId ? edge.fromId : edge.baseFormId,
  };
}

/**
 * 指定したポケモンの進化先ID一覧を取得する
 *
 * 例:
 * イーブイ(133)
 * → [134, 135, 136 ...]
 */
export const getNextEvolutionPokemonIds = (
  id: number,
  edges: PokemonEvolutionEdge[]
): number[] => {

  // 現在のポケモンが進化元にある edge を探す
  const nextEdges = edges.filter(
    (e) => e.fromId === id && e.fromId === e.baseFormId
  );

  // 進化先ID一覧を返す
  return nextEdges.map(
    (edge) => edge.toId
  );
};

/**
 * リージョンフォームの有無の確認
 * '-alola', '-galar', '-hisui', '-paldea'  などのサフィックスがついているかで判定
 * '-alola'が含まれていたら配列に'alola'を追加。
 * 何もないなら空配列を返す
 */
const getPokemonRegions = (varieties: PokemonVariety[]) => {
  const regions: PokemonRegion[] = [];

  // 配列データのpokemon.nameにリージョンフォームのサフィックスが含まれているか確認

  for (const variety of varieties) {
    const pokemonName = variety.pokemon.name;
    const baseFormId = extractIdFromUrl(variety.pokemon.url);

    for (const regionKey of Object.keys(regionData) as (keyof typeof regionData)[]) {

      // リージョン確認
      const hasRegion = pokemonName.includes(`-${regionKey}`);

      // リージョン除外パターン確認
      const isExcluded = excludedPatterns.some((pattern) =>
        pattern.test(pokemonName)
      );

      if (hasRegion && !isExcluded) {
        regions.push({
          region: regionData[regionKey].ja,
          baseFormId,
        });
      }
    }
  }
  return regions;
};

/**
 * メガシンカの有無の確認
 */
const getMegaPokemons = (varieties: PokemonVariety[]) => {
  const megaPokemon: MegaPokemon[] = [];

  for (const variety of varieties) {
    const pokemonName = variety.pokemon.name;
    const baseFormId = extractIdFromUrl(variety.pokemon.url);

    if (pokemonName.includes("-mega")) {
      const megaType = pokemonName.split("-mega")[1];

      megaPokemon.push({
        type: megaType
          ? megaType.replace("-", "").toUpperCase()
          : "",
        baseFormId,
      });
    }
  }

  return megaPokemon;
};


/**
 * 指定した言語の名称を取得する関数
 * @param {string} url - 情報を取得するURL
 * @param {string} lang - 言語コード (例: "ja" for Japanese)
 * @returns {Promise<string>} 日本語名またはデフォルト値 "不明"
 */
const fetchLocalizedName = async (
  url: string,
  lang: string = "ja"
): Promise<string> => {
  try {
    // APIリクエストを送信
    const response = await axios.get<PokemonTypeLangData>(url);
    const data = response.data;

    const dataLang = data.names.find(
      (entry) => entry.language.name === lang
    )?.name;

    return dataLang || "不明"; // 見つからなかった場合のデフォルト値
  } catch (error) {
    console.error("Error fetching type data:", error);
    return "不明"; // エラー時のデフォルト値
  }
};

/**
 * 指定した言語の説明文を取得する関数
 * @param {string} url - 情報を取得するURL
 * @param {string} lang - 言語コード (例: "ja" for Japanese)
 * @returns {Promise<string>} 日本語名またはデフォルト値 "不明"
 */
const fetchLocalizedFlavorText = async (
  url: string,
  lang: string = "ja"
): Promise<string> => {
  try {
    // APIリクエストを送信
    const response = await axios.get<PokemonFlavorTextLangData>(url);
    const data = response.data;

    // 最後の要素を取り出す
    const jaEntries = data.flavor_text_entries.filter(
      (entry) => entry.language.name === lang
    );

    const dataLang = jaEntries[jaEntries.length - 1]?.flavor_text?.replace(/\n/g, "　");

    return dataLang || "不明"; // 見つからなかった場合のデフォルト値
  } catch (error) {
    console.error("Error fetching type data:", error);
    return "不明"; // エラー時のデフォルト値
  }
};

/**
 * genderRateからポケモンの性別を取得する関数
 *
 * @param genderRate - ポケモンの性別比率を示す数値
 *  - 8: メスのみ
 *  - 0: オスのみ
 *  - -1: 性別不明
 *  - 0 < genderRate < 8: オス・メス
 *  - それ以外: データエラー
 * @returns 性別の配列
 *  - ['♀']: メスのみ
 *  - ['♂']: オスのみ
 *  - ['不明']: 性別不明
 *  - ['♀', '♂']: オス・メス
 *  - ['データを取得できませんでした']: 無効なgenderRateの場合
 */
const getPokemonGender = (genderRate: number): string[] => {
  if (genderRate === 8) {
    return ["female"];
  } else if (genderRate === 0) {
    return ["male"];
  } else if (genderRate === -1) {
    return ["unknown"];
  } else if (genderRate > 0 && genderRate < 8) {
    return ["female", "male"];
  } else {
    return ["データを取得できませんでした"];
  }
};

/**
 * URLからポケモンIDを抽出する関数
 * @param url - ポケモンAPIのURL
 * @returns 抽出したID（数値）
 */
const extractIdFromUrl = (url: string): number => {
  // URLをスラッシュで分割し、最後から2番目の要素を取得
  const id = url.split("/").slice(-2, -1)[0];
  return Number(id);
};

// 取得
export const fetchPokemonRaw = async (id: number) => {
  const pokemon = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
  const species = await axios.get(pokemon.data.species.url);
  const chain = await axios.get(species.data.evolution_chain.url);
  const pokemonId = extractIdFromUrl(pokemon.data.species.url);

  return {
    pokemonId: pokemonId,
    pokemon: pokemon.data,
    species: species.data,
    chain: chain.data.chain,
  };
};

// ローカライズ
const extractJa = (species: FetchPokemonSpecies) => {
  const name =
    species.names.find((n) => n.language.name === LANG)?.name ?? "";

  const genus =
    species.genera.find((g) => g.language.name === "ja")?.genus ??
    species.genera.find((g) => g.language.name === "ja-hrkt")?.genus ??
    "";

  const flavor =
    species.flavor_text_entries.find(
      (f) => f.language.name === LANG
    )?.flavor_text.replace(/\n/g, "　") ?? "";

  return { name, genus, flavor };
};

export const getPokemon = async (id: number): Promise<Pokemon> => {
  const { pokemon, species, chain, pokemonId } = await fetchPokemonRaw(id);
  
  const { name: pokemonNameJa, genus: pokemonGeneraJa, flavor: pokemonFlavorTextJa } = extractJa(species);

  const pokemonTypes = pokemon.types.map((t: { type: { name: string } }) => t.type.name || "不明",);
  
  // ポケモンの性別
  const pokemonGenderRate = species.gender_rate;
  const pokemonGender = getPokemonGender(pokemonGenderRate);
  
  // ポケモンの高さ
  const pokemonHeight = pokemon.height / 10;
  // ポケモンの重さ
  const pokemonWeight = pokemon.weight / 10;

  // ポケモンのステータスを取得
  const pokemonHp = pokemon.stats.find((s: { stat: { name: string } }) => s.stat.name === "hp")?.base_stat || 0;
  const pokemonAttack = pokemon.stats.find((s: { stat: { name: string } }) => s.stat.name === "attack")?.base_stat || 0;
  const pokemonDefense = pokemon.stats.find((s: { stat: { name: string } }) => s.stat.name === "defense")?.base_stat || 0;
  const pokemonSpecialAttack = pokemon.stats.find((s: { stat: { name: string } }) => s.stat.name === "special-attack")?.base_stat || 0;
  const pokemonSpecialDefense = pokemon.stats.find((s: { stat: { name: string } }) => s.stat.name === "special-defense")?.base_stat || 0;
  const pokemonSpeed = pokemon.stats.find((s: { stat: { name: string } }) => s.stat.name === "speed")?.base_stat || 0;

  const pokemonStats = {
    hp: pokemonHp,
    attack: pokemonAttack,
    defense: pokemonDefense,
    specialAttack: pokemonSpecialAttack,
    specialDefense: pokemonSpecialDefense,
    speed: pokemonSpeed,
  };


  // ポケモンの特性
  const pokemonAbilities: { url: string, isHidden: boolean }[] = pokemon.abilities.map(
    (entry: {
      ability: { url: string };
      is_hidden: boolean;
    }) => ({
      url: entry.ability.url,
      isHidden: entry.is_hidden,
    })
  );
  const pokemonAbilityJa = await Promise.all(
    pokemonAbilities.map(async ({ url, isHidden }) => ({
      name: await fetchLocalizedName(url, LANG),
      flavorText: await fetchLocalizedFlavorText(url, LANG),
      isHidden,
    }))
  );

  // ポケモンのイメージURL
  const pokemonNormalImageUrl = pokemon.sprites.other["official-artwork"].front_default;
  const pokemonShinyImageUrl = pokemon.sprites.other["official-artwork"].front_shiny;

  // 進化系統
  const pokemonEvolutionEdge = convertEvolutionChainToEdges(chain);

  // リージョンフォーム
  const pokemonRegions = getPokemonRegions(species.varieties);
  // メガシンカ
  const megaPokemons = getMegaPokemons(species.varieties);

  return {
    id: pokemonId,
    name: pokemonNameJa || "データが存在しません",
    gender: pokemonGender,
    height: pokemonHeight,
    weight: pokemonWeight,
    types: pokemonTypes,
    abilities: pokemonAbilityJa,
    stats: pokemonStats,
    imageUrl: pokemonNormalImageUrl,
    shinyImageUrl: pokemonShinyImageUrl,
    genus: pokemonGeneraJa || "データが存在しません",
    flavorText: pokemonFlavorTextJa || "データが存在しません",
    evolutionEdge: pokemonEvolutionEdge,
    regions: pokemonRegions,
    megaPokemons: megaPokemons,
  };
};
