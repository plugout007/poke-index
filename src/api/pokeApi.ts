import axios from "axios";
import {
  PokemonListResponse,
  FetchPokemon,
  FetchPokemonSpecies,
  Pokemon,
  PokemonTypeLangData,
  // PokemonEvolutionChainResponse,
  // FetchPokemonEvolutionChainResponse,
} from "../types/pokemon";
import { API_BASE_URL } from "../config/api-config";
import { LANG } from "../config/app-config";
import { typeData } from "../constants/pokemon";

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

// [未実装]進化データ取得
// export const fetchPokemonEvolutionChain = async (
//   url: string
// ): Promise<PokemonEvolutionChainResponse> => {
//   const response = await axios.get<FetchPokemonEvolutionChainResponse>(url);
//   // 最初のポケモンの名前を取得
//   const seedPokemonName = await getPokemonNameJp(
//     response.data.chain.species.url
//   );
//   const seedPokemonId = extractIdFromUrl(response.data.chain.species.url);
//   const seedPokemonResponse = await axios.get<FetchPokemon>(
//     `${API_BASE_URL}/pokemon/${seedPokemonId}`
//   );
//   const seedPokemonImgUrl = seedPokemonResponse.data.sprites.front_default;

//   // 進化段階を格納する配列
//   const firstStageNames: string[] = [];
//   const firstStageNamesImgUrl: string[] = [];
//   const secondStageNames: string[] = [];
//   const secondStageNamesImgUrl: string[] = [];

//   const firstStage = [];
//   const secondStage = [];

//   // 進化チェーンを解析
//   if (response.data.chain.evolves_to) {
//     for (const evolveFirst of response.data.chain.evolves_to) {
//       // 第一段階のポケモン名を取得
//       const evolveFirstPokemonName = await getPokemonNameJp(
//         evolveFirst.species.url
//       );
//       firstStageNames.push(evolveFirstPokemonName);

//       const evolveFirstPokemonId = extractIdFromUrl(evolveFirst.species.url);
//       const evolveFirstPokemonResponse = await axios.get<FetchPokemon>(
//         `${API_BASE_URL}/pokemon/${evolveFirstPokemonId}`
//       );
//       const evolveFirstPokemonImgUrl =
//         evolveFirstPokemonResponse.data.sprites.front_default;
//       firstStageNamesImgUrl.push(evolveFirstPokemonImgUrl);

//       firstStage.push({imageUrl: evolveFirstPokemonImgUrl, name: evolveFirstPokemonName});

//       // 第二段階の進化を解析
//       for (const evolveSecond of evolveFirst.evolves_to) {
//         const evolveSecondPokemonName = await getPokemonNameJp(
//           evolveSecond.species.url
//         );
//         secondStageNames.push(evolveSecondPokemonName);

//         const evolveSecondPokemonId = extractIdFromUrl(
//           evolveSecond.species.url
//         );
//         const evolveSecondPokemonResponse = await axios.get<FetchPokemon>(
//           `${API_BASE_URL}/pokemon/${evolveSecondPokemonId}`
//         );
//         const evolveSecondPokemonImgUrl =
//           evolveSecondPokemonResponse.data.sprites.front_default;
//         secondStageNamesImgUrl.push(evolveSecondPokemonImgUrl);

//         secondStage.push({imageUrl: evolveSecondPokemonImgUrl, name: evolveSecondPokemonName});
//       }
//     }
//   }

//   const pokemonEvolutionChain = {
//     seed: seedPokemonName,
//     seedImg: seedPokemonImgUrl,
//     first: firstStageNames,
//     firstImg: firstStageNamesImgUrl,
//     second: secondStageNames,
//     secondImg: secondStageNamesImgUrl,
//     firstStage: firstStage,
//     secondStage: secondStage,
//   };
//   return pokemonEvolutionChain;
// };

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
 * 指定されたURLからポケモンの日本語名を取得する関数
 *
 * @param url - ポケモンのAPI URL
 * @returns 日本語名（取得できない場合は空文字列）
 */
// const getPokemonNameJp = async (url: string): Promise<string> => {
//   try {
//     const response = await axios.get(url);

//     // 名前リストから日本語名を検索
//     const nameEntry = response.data.names.find(
//       (entry: { language: { name: string }; name: string }) =>
//         entry.language.name === "ja" // 言語コードを直接記述
//     );

//     // 日本語名を返す（見つからない場合は空文字列）
//     return nameEntry?.name ?? "";
//   } catch (error) {
//     console.error("Failed to fetch Pokemon name:", error);
//     return ""; // エラー時は空文字列を返す
//   }
// };

/**
 * URLからポケモンIDを抽出する関数
 * @param url - ポケモンAPIのURL
 * @returns 抽出したID（成功した場合）またはnull（失敗した場合）
 */
// const extractIdFromUrl = (url: string) => {
//   try {
//     // URLをスラッシュで分割し、最後から2番目の要素を取得
//     const id = url.split("/").slice(-2, -1)[0];
//     return id;
//   } catch (error) {
//     console.error(`エラー: ${error}`);
//     return null;
//   }
// };

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

// タイプ・特性
const extractTypes = (pokemon: FetchPokemon) => {
  return pokemon.types.map((t) => ({
    en: t.type.name,
    ja: typeData[t.type.name as keyof typeof typeData]?.ja || "不明",
  }));
};

export const getPokemon = async (id: number): Promise<Pokemon> => {
  const { pokemon, species } = await fetchPokemonRaw(id);
  
  const { name: pokemonNameJa, genus: pokemonGeneraJa, flavor: pokemonFlavorTextJa } = extractJa(species);
  const pokemonTypes = extractTypes(pokemon);
  
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

  return {
    id: pokemon.id,
    name: pokemonNameJa || "データが存在しません",
    gender: pokemonGender,
    height: pokemonHeight,
    weight: pokemonWeight,
    types: pokemonTypes,
    abilities: pokemonAbilityJa,
    url: `${API_BASE_URL}/pokemon/${id}`,
    imageUrl: pokemon.sprites.front_default,
    genus: pokemonGeneraJa || "データが存在しません",
    flavorText: pokemonFlavorTextJa || "データが存在しません",
  };
};
