import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { NamedResource } from "../src/types/pokemon.js";
import { extractIdFromUrl, extractJa } from "../src/api/pokeApi.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type PokeSpeciesResponse = {
  names: {
    name: string;
    language: NamedResource;
  }[];
};

type PokePokemonResponse = {
  types: {
    type: NamedResource;
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  types: string[];
};

type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: NamedResource[];
};

const fetchPokemons = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  );
  const data = await response.json() as PokemonListResponse;
  return data.results;
}

const fetchBatch = async (pokemons: NamedResource[]) => {
  const batchSize = 50;
  const results = [];

  for (let i = 0; i < pokemons.length; i += batchSize) {
    const batch = pokemons.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (pokemon) => {
        const response = await fetch(pokemon.url);

        if (!response.ok) {
          throw new Error(`pokemon fetch失敗: ${pokemon.name}`);
        }

        const data = await response.json();
        const pokemonId = extractIdFromUrl(data.species.url);
        if(pokemonId === 25 && ![pokemonId, 10199].includes(data.id) ) return;

        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const { name: pokemonNameJa } = extractJa(speciesData);

        const formResponse = await fetch(data.forms[0].url);
        const formData = await formResponse.json();

        const formNameJa = formData.form_names?.find(
          (formName) =>
            formName.language.name === 'ja'
        );
        const formName = formNameJa?.name || "";
        const pokemonName = formName?.includes('メガ') ? formName : formName ? `${pokemonNameJa} (${formName})` : pokemonNameJa || "データが存在しません";


        return {
          id: pokemonId,
          baseFormId: data.id,
          name: pokemonName,
          types: data.types.map((t) => t.type.name),
        };
      })
    );
    results.push(...batchResults);
  console.log(`${results.length}件取得`);
  }

  return results;
};

const main = async () => {
  const pokemons = await fetchPokemons();
  const results = await fetchBatch(pokemons);
  const sortedResults = results.sort((a, b) => a.id - b.id);


  const outputPath = path.resolve(
    __dirname,
    "../src/data/pokemonJaAll.json"
  );

  await fs.writeFile(
    outputPath,
    JSON.stringify(sortedResults, null, 2),
    "utf-8"
  );

  console.log("JSONファイルを出力しました！");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
