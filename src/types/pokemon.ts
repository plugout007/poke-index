import { typeData } from "../constants/pokemon";

/** NamedResource */
export type NamedResource = {
  name: string;
  url: string;
};

/** Pokemon List Item */
export type PokemonListItem = {
  id: number;
  name: string;
  types: PokemonTypeName[];
};

/** Pokemon */
export type Pokemon = {
  /** ポケモン図鑑ID（フォームによって重複する） */
  id: number;
  /** ポケモンの基本フォームを識別するID */
  baseFormId: number;
  /** ポケモンの表示名 */
  name: string;
  /** ポケモンの性別 */
  gender: string[];
  /** ポケモンの高さ */
  height: number;
  /** ポケモンの重さ */
  weight: number;
  /** ポケモンのタイプ */
  types: PokemonTypeName[];
  /** ポケモンの特性 */
  abilities: { name: string, flavorText: string, isHidden: boolean }[];
  /** ポケモンの画像URL */
  imageUrl: string;
  /** ポケモンの色違い画像URL */
  shinyImageUrl?: string;
  /** ポケモンの分類名 */
  genus: string;
  /** ポケモンの説明文 */
  flavorText: string;
  /** 進化系統データ */
  evolutionEdge: PokemonEvolutionEdge[];
  /** リージョンフォームデータ */
  regions: PokemonRegion[];
  /** メガシンカデータ */
  megaPokemons: MegaPokemon[];
  /** フォルム違いデータ */
  formPokemons: FormPokemon[];
  /** バラエティ違いデータ */
  varietyPokemons: VarietyPokemon[];
  /** ポケモンのステータス */
  stats: {
    /** HP */
    hp: number;
    /** こうげき */
    attack: number;
    /** ぼうぎょ */
    defense: number;
    /** とくこう */
    specialAttack: number;
    /** とくぼう */
    specialDefense: number;
    /** すばやさ */
    speed: number;
  };
};

export type PokemonDetail = {
  pokemon: Pokemon;
  chain: ChainLink;
}

/**
 * ポケモンの基本的な情報
 */
export type FetchPokemon = {
  id: number;        // ポケモンの一意のID
  height: number;    // ポケモンの高さ
  weight: number;    // ポケモンの体重
  species: NamedResource;
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
  pokemon: NamedResource;
}

/**
 * 言語別のポケモンの名前
 */
type PokemonName = {
  language: NamedResource;
  name: string;
}

export type PokemonType = {
  type: NamedResource;
}

type PokemonAbility = {
  ability: NamedResource;
}

type PokemonTypeLang = {
  language: NamedResource;
  name: string;
}
type PokemonFlavorTextLang = {
  language: NamedResource;
  flavor_text: string;
}

export type PokemonTypeLangData = {
  names: PokemonTypeLang[];
}

export type PokemonFlavorTextLangData = {
  flavor_text_entries: PokemonFlavorTextLang[];
}

type PokemonGenus = {
  language: NamedResource;
  genus: string;
}

/**
 * 言語別のフレーバーテキスト（ゲーム内でのポケモンの説明）
 */
type FlavorTextEntry = {
  flavor_text: string;
  language: NamedResource;
  version: NamedResource;
}

export type PokemonEvolutionEdge = {
  fromId: number;
  toId: number;
  baseFormId: number;
  evolvedFormId: number;
}

export type ChainLink = {
  species: NamedResource;
  evolves_to: ChainLink[];
  evolution_details: {
    base_form: NamedResource | null;
    evolved_form: NamedResource | null;
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

export type FormPokemon = {
  name: string;
  imageUrl: string;
}

export type VarietyPokemon = {
  baseFormId: number;
  name: string;
  imageUrl: string;
}

export type PokemonFormResponse = NamedResource

export type PokemonFormLang = {
  language : NamedResource;
  name: string;
}

export type Gender = "male" | "female" | "unknown";

/** タイプによるダメージの関係性 */
export type DamageRelations = {
  /** 受けるダメージが効果抜群 */
  double_damage_from: NamedResource[];
  /** 与えるダメージが効果抜群 */
  double_damage_to: NamedResource[];
  /** 受けるダメージが半分 */
  half_damage_from: NamedResource[];
  /** 与えるダメージが半分 */
  half_damage_to: NamedResource[];
  /** 受けるダメージがない */
  no_damage_from: NamedResource[];
  /** 与えるダメージがない */
  no_damage_to: NamedResource[];
};

export type PokemonTypeName = keyof typeof typeData;
