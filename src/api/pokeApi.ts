import axios from 'axios';
import { PokemonListResponse, FetchPokemon, FetchPokemonSpecies, Pokemon, PokemonTypeLangData } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

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

  const nextUrl = response.data.next;
  const previousUrl = response.data.previous;

  // 全てのプロミスを解決して返却
  const pokemonListResults = await Promise.all(pokemonPromises);

  const pokemonList = {
    next: nextUrl,
    previous: previousUrl,
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

export const fetchPokemonSpecies = async (id: string): Promise<FetchPokemonSpecies> => {
  const PokemonSpeciesResponse = await  axios.get<FetchPokemonSpecies>(`${API_BASE_URL}/pokemon-species/${id}`);
  return PokemonSpeciesResponse.data;
}

/**
 * 日本語名を取得するための関数
 * @param {string} typeUrl - タイプ情報を取得するURL
 * @returns {Promise<string>} 日本語名またはデフォルト値 "不明"
 */
const getTypeJa = async (typeUrl: string) => {
  try {
    // APIリクエストを送信
    const response = await axios.get<PokemonTypeLangData>(typeUrl);
    const typeData = response.data;

    // "ja" の名前を検索
    const typeJa = typeData.names.find(
      (entry) => entry.language.name === 'ja'
    )?.name;

    return typeJa || "不明"; // 見つからなかった場合のデフォルト値
  } catch (error) {
    console.error("Error fetching type data:", error);
    return "不明"; // エラー時のデフォルト値
  }
};

export const getPokemon = async (id: number): Promise<Pokemon> => {
  const pokemonUrl = `${API_BASE_URL}/pokemon/${id}`
  const pokemonResponse = await axios.get<FetchPokemon>(pokemonUrl);
  const pokemonSpeciesResponse = await  axios.get<FetchPokemonSpecies>(`${API_BASE_URL}/pokemon-species/${id}`);
  // 日本語のポケモン名
  const pokemonNameJa = pokemonSpeciesResponse.data.names.find((entry) => entry.language.name === 'ja')?.name;
  // 日本語のポケモンの分類
  const pokemonGeneraJa = pokemonSpeciesResponse.data.genera.find((entry) => entry.language.name === 'ja')?.genus
  // 日本語のフレーバーテキスト
  const pokemonFlavorTextJa = pokemonSpeciesResponse.data.flavor_text_entries.find((entry) => entry.language.name === 'ja')?.flavor_text;
  // ポケモンの高さ
  const pokemonHeight = pokemonResponse.data.height / 10;
  // ポケモンの重さ
  const pokemonWeight = pokemonResponse.data.weight / 10;

  // ポケモンのタイプ・属性
  const pokemonTypeUrl = pokemonResponse.data.types.map((typeInfo) => typeInfo.type.url)
  const pokemonTypeJa = await Promise.all(pokemonTypeUrl.map((url) => getTypeJa(url)));

  const pokemon: Pokemon = {
    id: pokemonResponse.data.id,
    name: pokemonNameJa || 'データが存在しません',
    height : pokemonHeight,
    weight : pokemonWeight,
    types: pokemonTypeJa,
    url: pokemonUrl,
    imageUrl: pokemonResponse.data.sprites.front_default,
    genus: pokemonGeneraJa || 'データが存在しません',
    flavorText: pokemonFlavorTextJa || 'データが存在しません',
  };
  return pokemon
}