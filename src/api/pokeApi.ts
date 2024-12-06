import axios from 'axios';
import { PokemonListResponse, FetchPokemon, FetchPokemonSpecies, Pokemon, PokemonTypeLangData, PokemonEvolutionChainResponse, FetchPokemonEvolutionChainResponse } from '../types/pokemon';
import { API_BASE_URL, LANG } from '../utils/commonData';

/**
 * ポケモンリストを取得する関数
 * @param limit - 取得するポケモンの数
 * @param offset - ページングの開始位置
 * @returns PokemonListResponse
 */
export const fetchPokemonList = async (url: string): Promise<PokemonListResponse> => {
  const response = await axios.get<PokemonListResponse>(url);
  // 各ポケモンの詳細データを取得
  const pokemonPromises = response.data.results.map((pokemon) => {
    const id = pokemon.url.split('/').filter(Boolean).pop(); // URLからIDを抽出
    return id ? getPokemon(Number(id)) : null;
  });

  // 全てのプロミスを解決して返却
  const pokemonListResults = await Promise.all(pokemonPromises);

  const pokemonList = {

    results: pokemonListResults.filter((pokemon): pokemon is Pokemon => pokemon !== null),
  }

  // return pokemonListResults.filter((pokemon): pokemon is Pokemon => pokemon !== null);
  return pokemonList;
};

export const fetchPokemonEvolutionChain = async (url: string): Promise<PokemonEvolutionChainResponse> => {
  const response = await axios.get<FetchPokemonEvolutionChainResponse>(url);
  // 最初のポケモンの名前を取得
  const seedPokemonName = await getPokemonNameJp(response.data.chain.species.url);

  // 進化段階を格納する配列
  const firstStageNames: string[] = [];
  const secondStageNames: string[] = [];

  // 進化チェーンを解析
  if (response.data.chain.evolves_to) {
    for (const evolveFirst of response.data.chain.evolves_to) {
      // 第一段階のポケモン名を取得
      const evolveFirstPokemonName = await getPokemonNameJp(evolveFirst.species.url);
      firstStageNames.push(evolveFirstPokemonName);

      // 第二段階の進化を解析
      for (const evolveSecond of evolveFirst.evolves_to) {
        const evolveSecondPokemonName = await getPokemonNameJp(evolveSecond.species.url);
        secondStageNames.push(evolveSecondPokemonName);
      }
    }
  }

  const pokemonEvolutionChain = {
    seed: seedPokemonName,
    first: firstStageNames,
    second: secondStageNames,
  }
  return pokemonEvolutionChain
}

/**
 * 指定した言語の名称を取得する関数
 * @param {string} url - 情報を取得するURL
 * @param {string} lang - 言語コード (例: "ja" for Japanese)
 * @returns {Promise<string>} 日本語名またはデフォルト値 "不明"
 */
const fetchLocalizedName = async (url: string, lang: string = 'ja'): Promise<string> => {
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
    return ['♀'];
  } else if (genderRate === 0) {
    return ['♂'];
  } else if (genderRate === -1) {
    return ['不明'];
  } else if (genderRate > 0 && genderRate < 8 ) {
    return ['♀', '♂'];
  } else {
    return ['データを取得できませんでした']
  }
}

/**
 * 指定されたURLからポケモンの日本語名を取得する関数
 * 
 * @param url - ポケモンのAPI URL
 * @returns 日本語名（取得できない場合は空文字列）
 */
const getPokemonNameJp = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(url);

    // 名前リストから日本語名を検索
    const nameEntry = response.data.names.find(
      (entry: { language: { name: string }; name: string }) => entry.language.name === "ja" // 言語コードを直接記述
    );

    // 日本語名を返す（見つからない場合は空文字列）
    return nameEntry?.name ?? "";
  } catch (error) {
    console.error("Failed to fetch Pokemon name:", error);
    return ""; // エラー時は空文字列を返す
  }
};


export const getPokemon = async (id: number): Promise<Pokemon> => {
  const pokemonUrl = `${API_BASE_URL}/pokemon/${id}`
  const pokemonResponse = await axios.get<FetchPokemon>(pokemonUrl);
  const pokemonSpeciesUrl = pokemonResponse.data.species.url;
  const pokemonSpeciesResponse = await axios.get<FetchPokemonSpecies>(pokemonSpeciesUrl);
  // 日本語のポケモン名
  const pokemonNameJa = pokemonSpeciesResponse.data.names.find((entry) => entry.language.name === LANG)?.name;
  // 日本語のポケモンの分類
  const pokemonGeneraJa = pokemonSpeciesResponse.data.genera.find((entry) => entry.language.name === LANG)?.genus
  // 日本語のフレーバーテキスト
  const pokemonFlavorTextJa = pokemonSpeciesResponse.data.flavor_text_entries.find((entry) => entry.language.name === LANG)?.flavor_text;
  // ポケモンの高さ
  const pokemonHeight = pokemonResponse.data.height / 10;
  // ポケモンの重さ
  const pokemonWeight = pokemonResponse.data.weight / 10;

  // ポケモンのタイプ・属性
  const pokemonTypesUrl = pokemonResponse.data.types.map((typeInfo) => typeInfo.type.url)
  const pokemonTypeJa = await Promise.all(pokemonTypesUrl.map((url) => fetchLocalizedName(url, LANG)));

  // ポケモンの特性
  const pokemonAbilitiesUrl = pokemonResponse.data.abilities.map((entry) => entry.ability.url);
  const pokemonAbilityJa = await Promise.all(pokemonAbilitiesUrl.map((url) => fetchLocalizedName(url, LANG)));

  // ポケモンの性別
  const pokemonGenderRate = pokemonSpeciesResponse.data.gender_rate;
  const pokemonGender = getPokemonGender(pokemonGenderRate);
  
  const pokemonEvolutionChainUrl = pokemonSpeciesResponse.data.evolution_chain.url;
  const pokemonEvolutionChain = await fetchPokemonEvolutionChain(pokemonEvolutionChainUrl);
  const pokemon: Pokemon = {
    id: pokemonResponse.data.id,
    name: pokemonNameJa || 'データが存在しません',
    gender: pokemonGender,
    height : pokemonHeight,
    weight : pokemonWeight,
    types: pokemonTypeJa,
    abilities: pokemonAbilityJa,
    url: pokemonUrl,
    imageUrl: pokemonResponse.data.sprites.front_default,
    genus: pokemonGeneraJa || 'データが存在しません',
    flavorText: pokemonFlavorTextJa || 'データが存在しません',
    evolutionChainSeed: pokemonEvolutionChain.seed,
    evolutionChainFirst: pokemonEvolutionChain.first,
    evolutionChainSecond: pokemonEvolutionChain.second,
  };
  return pokemon
}