import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { DamageRelations } from "../src/types/pokemon.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type PokeTypeResponse = {
  name: string;
  damage_relations: DamageRelations;
};

export type PokemonType = {
  id: number;
  name: string;
  damage_relations: {
    double_damage_from: string[];
    double_damage_to: string[];
    half_damage_from: string[];
    half_damage_to: string[];
    no_damage_from: string[];
    no_damage_to: string[];
  }
};

const getTypeName = (types: { name: string }[]) =>
  types.map((type) => type.name);

/** 現在のポケモンのタイプの総数（ステラを除く） */
export const POKE_TYPE_ID_MAX = 18;

const fetchBatch = async (start: number, end: number) => {
  const promises: Promise<PokemonType>[] = [];

  for (let i = start; i <= end; i++) {
    promises.push(
      Promise.all([
        fetch(`https://pokeapi.co/api/v2/type/${i}`).then(
          async (res) => {
            if (!res.ok) throw new Error(`type fetch失敗: ${i}`);
            return (await res.json()) as PokeTypeResponse;
          },
        ),
      ]).then(([types]) => ({
        id: i,
        name:
          types.name,
        damage_relations: {
          double_damage_from: getTypeName(types.damage_relations.double_damage_from),
          double_damage_to: getTypeName(types.damage_relations.double_damage_to),
          half_damage_from: getTypeName(types.damage_relations.half_damage_from),
          half_damage_to: getTypeName(types.damage_relations.half_damage_to),
          no_damage_from: getTypeName(types.damage_relations.no_damage_from),
          no_damage_to: getTypeName(types.damage_relations.no_damage_to),
        }
      })),
    );
  }

  return Promise.all(promises);
};

const getPokemonJaNames = async () => {
  const results: PokemonType[] = [];
  const batchSize = 50;

  for (let i = 1; i <= POKE_TYPE_ID_MAX; i += batchSize) {
    const end = Math.min(i + batchSize - 1, POKE_TYPE_ID_MAX);
    const batch = await fetchBatch(i, end);

    results.push(...batch);

    console.log(`${i}〜${end} 完了`);
  }

  return results;
};

const main = async () => {
  const data = await getPokemonJaNames();

  const outputPath = path.resolve(
    __dirname,
    "../src/data/pokemonTypeRelation.json"
  );

  await fs.writeFile(
    outputPath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  console.log("JSONファイルを出力しました！");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
