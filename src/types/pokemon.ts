/** Pokemon */
export type Pokemon = {
  id: number;
  name: string;
  gender: string[];
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  url: string;
  imageUrl: string;
  genus: string;
  flavorText: string;

  evolutionChainSeed: string,
  evolutionChainFirst: string[],
  evolutionChainSecond: string[],

};

export type PokemonListResponse = {
  results: Pokemon[];
};

export type PokemonDetail = {
  pokemon: Pokemon;
  
}

/**
 * ポケモンの基本的な情報
 * 
 * @property {number} id - ポケモンのID
 * @property {number} height - ポケモンの高さ
 * @property {number} weight - ポケモンの重さ
 * @property {object} sprites - ポケモンの画像に関連する情報
 * @property {string} sprites.front_default - ポケモンの通常の画像のURL
 */
export type FetchPokemon = {
  id: number;        // ポケモンの一意のID
  height: number;    // ポケモンの高さ
  weight: number;    // ポケモンの体重
  species: {
    url: string;
  }
  sprites: {
    front_default: string; // 通常の画像のURL
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
};

/**
 * ポケモンの言語別の情報
 * 
 * @property {number} id - ポケモンのID
 * @property {PokemonName[]} names - 言語別のポケモンの名前
 * @property {FlavorTextEntry[]} sprites.front_default - 言語別のフレーバーテキスト
 */
export type FetchPokemonSpecies = {
  id: number;
  names: PokemonName[];
  flavor_text_entries: FlavorTextEntry[];
  genera: PokemonGenus[];
  gender_rate: number;
  evolution_chain: {
    url: string
  }
}

/**
 * ポケモンの進化チェーンのレスポンス型
 */
export type FetchPokemonEvolutionChainResponse = {
  chain: EvolutionStage;
}

/**
 * 進化ステージの型
 * 進化先と種別情報を含む
 */
type EvolutionStage = {
  evolves_to: EvolutionStage[];
  species: PokemonSpecies;
}
/**
 * ポケモン種別情報の型
 */
type PokemonSpecies = {
    url: string;
}

/**
 * 言語別のポケモンの名前
 * 
 * @property {Object} language - 言語に関する情報
 * @property {string} language.name - 言語名
 * @property {string} name - ポケモンの名前
 */
type PokemonName = {
  language: {
    name: string;
  };
  name: string;
}

type PokemonType = {
  type: {
    name: string;
    url: string;
  }
}

type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  }
}

type PokemonTypeLang = {
  language: {
    name: string;
  };
  name: string;
}

export type PokemonTypeLangData = {
  names: PokemonTypeLang[];
}

type PokemonGenus = {
  language: {
    name: string;
  };
  genus: string;
}

/**
 * 言語別のフレーバーテキスト（ゲーム内でのポケモンの説明）
 * 
 * @property {string} flavor_text - フレーバーテキスト（ポケモンの説明）
 * @property {Object} language - 言語に関する情報
 * @property {string} language.name - 言語名
 * @property {Object} version - ゲームバージョンに関する情報
 * @property {string} version.name - ゲームバージョン名
 */
type FlavorTextEntry = {
  flavor_text: string;
  language: {
    name: string;
  };
  version: {
    name: string;
  }
}

export type PokemonEvolutionChainResponse = {
  seed: string,
  first: string[],
  second: string[],
}