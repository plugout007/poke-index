/** Pokemon List Item */
export type PokemonListItem = {
  id: number;
  name: string;
  types: string[];
};

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
  shinyImageUrl?: string;
  genus: string;
  flavorText: string;

  // [未実装] 進化チェーン関連のプロパティ
  // evolutionChainSeed: string,
  // evolutionChainSeedImg: string,
  // evolutionChainFirst: string[],
  // evolutionChainFirstImg: string[],
  // evolutionChainSecond: string[],
  // evolutionChainSecondImg: string[],
  // varietiesUrl: string[],
  // evolutionChainFirstStage: { imageUrl: string; name: string; }[],
  // evolutionChainSecondStage: { imageUrl: string; name: string; }[],

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
    other: {
      "official-artwork": {
        front_default: string;
      }
    }
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
  };
  varieties: PokemonVariety[];
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
type PokemonVariety = {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  }
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
  seedImg: string,
  first: string[],
  firstImg: string[],
  second: string[],
  secondImg: string[],
  firstStage: { imageUrl: string; name: string; }[],
  secondStage: { imageUrl: string; name: string; }[],
}