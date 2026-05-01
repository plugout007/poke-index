import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type PokeSpeciesResponse = {
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];
};

type PokePokemonResponse = {
  types: {
    type: {
      name: string;
    };
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  types: string[];
};

/** 現在のポケモンの種類の総数 */
export const POKE_INDEX_ID_MAX = 1025;

const fetchBatch = async (start: number, end: number) => {
  const promises: Promise<Pokemon>[] = [];

  for (let i = start; i <= end; i++) {
    promises.push(
      Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`).then(
          async (res) => {
            if (!res.ok) throw new Error(`species fetch失敗: ${i}`);
            return (await res.json()) as PokeSpeciesResponse;
          },
        ),
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(async (res) => {
          if (!res.ok) throw new Error(`pokemon fetch失敗: ${i}`);
          return (await res.json()) as PokePokemonResponse;
        }),
      ]).then(([species, pokemon]) => ({
        id: i,
        name:
          species.names.find((n) => n.language.name === "ja")?.name ?? "不明",
        types: pokemon.types.map((t) => t.type.name),
      })),
    );
  }

  return Promise.all(promises);
};

const getPokemonJaNames = async () => {
  const results: Pokemon[] = [];
  const batchSize = 50;

  for (let i = 1; i <= POKE_INDEX_ID_MAX; i += batchSize) {
    const end = Math.min(i + batchSize - 1, POKE_INDEX_ID_MAX);
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
    "../src/data/pokemonJa.json"
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
