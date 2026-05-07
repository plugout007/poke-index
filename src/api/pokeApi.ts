import axios from "axios";
import {
  PokemonListResponse,
  FetchPokemonSpecies,
  Pokemon,
  PokemonTypeLangData,
  ChainLink,
  PokemonEvolutionEdge,
} from "../types/pokemon";
import { API_BASE_URL } from "../config/api-config";
import { LANG } from "../config/app-config";

/**
 * ポケモンリストを取得する関数
 * @param limit - 取得するポケモンの数
 * @param offset - ページングの開始位置
 * @returns PokemonListResponse
 */
export const fetchPokemonList = async (
  url: string
): Promise<PokemonListResponse> => {
  const response = await axios.get<PokemonListResponse>(url);
  // 各ポケモンの詳細データを取得
  const pokemonPromises = response.data.results.map((pokemon) => {
    const id = pokemon.url.split("/").filter(Boolean).pop(); // URLからIDを抽出
    return id ? getPokemon(Number(id)) : null;
  });

  // 全てのプロミスを解決して返却
  const pokemonListResults = await Promise.all(pokemonPromises);

  const pokemonList = {
    results: pokemonListResults.filter(
      (pokemon): pokemon is Pokemon => pokemon !== null
    ),
  };

  return pokemonList;
};

// evolution chain url を取得する関数
export const fetchPokemonEvolutionChainUrl = async (id: number): Promise<string> => {
  const response = await axios.get(`${API_BASE_URL}/pokemon-species/${id}`);
  return response.data.evolution_chain.url;
};

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
        trigger: detail?.trigger?.name ?? null,
        minLevel: detail?.min_level ?? null,
        item: detail?.item?.name ?? null,
      });

      // さらに次の進化先を探索
      walk(next);
    }
  }

  // 進化ツリーの探索開始
  walk(chain);

  return edges;
}

export const getEvolutionEdges = async (
  speciesId: number
): Promise<PokemonEvolutionEdge[]> => {
  // species
  const evolutionChainUrl =
    await fetchPokemonEvolutionChainUrl(speciesId);

  // evolution-chain
  const chainRes =
    await axios.get(
      evolutionChainUrl
    );

  // edge変換
  return convertEvolutionChainToEdges(
    chainRes.data.chain
  );
}

/**
 * edges に指定ポケモンIDが含まれるか確認
 */
export const hasPokemonInEdges = (
  pokemonId: number,
  edges: PokemonEvolutionEdge[]
) => {
  return edges.some(
    (edge) =>
      edge.fromId === pokemonId ||
      edge.toId === pokemonId
  );
};

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
    return ["♀"];
  } else if (genderRate === 0) {
    return ["♂"];
  } else if (genderRate === -1) {
    return ["不明"];
  } else if (genderRate > 0 && genderRate < 8) {
    return ["♀", "♂"];
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

  return {
    pokemon: pokemon.data,
    species: species.data,
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
    )?.flavor_text ?? "";

  return { name, genus, flavor };
};

export const getPokemon = async (id: number): Promise<Pokemon> => {
  const { pokemon, species } = await fetchPokemonRaw(id);
  
  const { name: pokemonNameJa, genus: pokemonGeneraJa, flavor: pokemonFlavorTextJa } = extractJa(species);

  const pokemonTypes = pokemon.types.map((t: { type: { name: string } }) => t.type.name || "不明",);
  
  // ポケモンの性別
  const pokemonGenderRate = species.gender_rate;
  const pokemonGender = getPokemonGender(pokemonGenderRate);
  
  // ポケモンの高さ
  const pokemonHeight = pokemon.height / 10;
  // ポケモンの重さ
  const pokemonWeight = pokemon.weight / 10;


  // ポケモンの特性
  const pokemonAbilitiesUrl = pokemon.abilities.map(
    (entry: { ability: { url: string } }) => entry.ability.url
  );
  const pokemonAbilityJa = await Promise.all(
    pokemonAbilitiesUrl.map((url: string) => fetchLocalizedName(url, LANG))
  );

  // ポケモンのイメージURL
  const pokemonNormalImageUrl = pokemon.sprites.other["official-artwork"].front_default;
  const pokemonShinyImageUrl = pokemon.sprites.other["official-artwork"].front_shiny;

  return {
    id: pokemon.id,
    name: pokemonNameJa || "データが存在しません",
    gender: pokemonGender,
    height: pokemonHeight,
    weight: pokemonWeight,
    types: pokemonTypes,
    abilities: pokemonAbilityJa,
    url: `${API_BASE_URL}/pokemon/${id}`,
    imageUrl: pokemonNormalImageUrl,
    shinyImageUrl: pokemonShinyImageUrl,
    genus: pokemonGeneraJa || "データが存在しません",
    flavorText: pokemonFlavorTextJa || "データが存在しません",
  };
};
