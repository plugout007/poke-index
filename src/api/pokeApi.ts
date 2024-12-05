import axios from 'axios';
import { PokemonListResponse, FetchPokemon, FetchPokemonSpecies, Pokemon, PokemonTypeLangData } from '../types/pokemon';
import { API_BASE_URL, POKE_INDEX_ID_MAX, LANG } from '../utils/commonData';

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

/**
 * 特定のポケモンの詳細を取得する関数
 * @param id - ポケモンの名前またはID
 * @returns PokemonDetails
 */
export const fetchPokemonDetails = async (id: string): Promise<FetchPokemon> => {
  const pokemonResponse = await axios.get<FetchPokemon>(`${API_BASE_URL}/pokemon/${id}`);
  return pokemonResponse.data;
};

// TODO:このデータをfetchできないときの処理
export const fetchPokemonSpecies = async (id: string): Promise<FetchPokemonSpecies | null> => {
  try {
    const pokemonSpeciesResponse = await axios.get<FetchPokemonSpecies>(`${API_BASE_URL}/pokemon-species/${id}`);
    return pokemonSpeciesResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
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

  const pokemon: Pokemon = {
    id: pokemonResponse.data.id,
    name: pokemonNameJa || 'データが存在しません',
    height : pokemonHeight,
    weight : pokemonWeight,
    types: pokemonTypeJa,
    abilities: pokemonAbilityJa,
    url: pokemonUrl,
    imageUrl: pokemonResponse.data.sprites.front_default,
    genus: pokemonGeneraJa || 'データが存在しません',
    flavorText: pokemonFlavorTextJa || 'データが存在しません',
  };
  return pokemon
}