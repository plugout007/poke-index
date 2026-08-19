import { typeData } from "../constants/pokemon";

/** Pokemon List Item */
export type PokemonListItem = {
  id: number;
  name: string;
  types: PokemonTypeName[];
};

/** Pokemon */
export type Pokemon = {
  id: number;
  name: string;
  gender: string[];
  height: number;
  weight: number;
  types: PokemonTypeName[];
  abilities: { name: string, flavorText: string, isHidden: boolean }[];
  imageUrl: string;
  shinyImageUrl?: string;
  genus: string;
  flavorText: string;
  evolutionEdge: PokemonEvolutionEdge[];
  regions: PokemonRegion[];
  megaPokemons: MegaPokemon[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};

export type PokemonDetail = {
  pokemon: Pokemon;
  chain: ChainLink;
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

export type PokemonVariety = {
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

export type PokemonType = {
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
type PokemonFlavorTextLang = {
  language: {
    name: string;
  };
  flavor_text: string;
}

export type PokemonTypeLangData = {
  names: PokemonTypeLang[];
}

export type PokemonFlavorTextLangData = {
  flavor_text_entries: PokemonFlavorTextLang[];
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

export type PokemonEvolutionEdge = {
  fromId: number;
  toId: number;
  baseFormId: number;
}

export type ChainLink = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainLink[];
  evolution_details: {
    base_form: {
      name: string;
      url: string;
    } | null;
  }[];
};

export type PokemonRegion = {
  region: string;
  baseFormId: number;
}

export type MegaPokemon = {
  type: string;
  baseFormId: number;
}

export type Gender = "male" | "female" | "unknown";

/** タイプによるダメージの関係性 */
export type DamageRelations = {
  /** 受けるダメージが効果抜群 */
  double_damage_from: { name: string, url: string }[];
  /** 与えるダメージが効果抜群 */
  double_damage_to: { name: string, url: string }[];
  /** 受けるダメージが半分 */
  half_damage_from: { name: string, url: string }[];
  /** 与えるダメージが半分 */
  half_damage_to: { name: string, url: string }[];
  /** 受けるダメージがない */
  no_damage_from: { name: string, url: string }[];
  /** 与えるダメージがない */
  no_damage_to: { name: string, url: string }[];
};

export type PokemonTypeName = keyof typeof typeData;
