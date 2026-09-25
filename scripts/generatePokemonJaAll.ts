import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { FetchPokemon, FetchPokemonForm, FetchPokemonSpecies, NamedResource } from "../src/types/pokemon.js";
import { extractIdFromUrl, extractJa } from "../src/api/pokeApi.js"
import { getDisplayPokemonName } from "../src/utils/getDisplayPokemonName.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

        const data = await response.json() as FetchPokemon;
        const pokemonId = extractIdFromUrl(data.species.url);

        // ピカチュウは原種とキョダイマックスのみ表示
        if(pokemonId === 25 && ![pokemonId, 10199].includes(data.id) ) return null;
        // ヌシポケモンは非表示
        if(data.name.includes('-totem')) return null;
        // メガニャオニクスのメスは非表示
        if(data.id === 10326) return null;
        // メテノで赤色以外は非表示
        if (
          // りゅうせいのすがたを除外
          (data.id >= 10130 && data.id <= 10135) ||
          // コアを除外
          (data.id >= 10137 && data.id <= 10142)
        ) {
          return null;
        }
        // ミミッキュ（ばれたすがた）は非表示
        if(data.id === 10143) return null;
        // メガマギアナ（500ねんまえのいろ）は非表示
        if(data.id === 10318) return null;
        // ウッウ(うのみのすがた)とウッウ (まるのみのすがた)は非表示
        if(data.id === 10182 || data.id === 10183) return null;
        // ザルード (とうちゃん)は非表示
        if(data.id === 10192) return null;
        // イッカネズミ (３びきかぞく)は非表示
        if(data.id === 10257) return null;
        // シャリタツはそったすがた以外は非表示
        if(data.id === 10258 || data.id === 10259) return null;
        // メガシャリタツはそったすがた以外は非表示
        if(data.id === 10323 || data.id === 10324) return null;
        // ノココッチ (みつふしフォルム)は非表示
        if(data.id === 10255) return null;
        // コライドン、ミライドンの他のフォルムは非表示
        if(data.id >= 10264 && data.id <= 10271) return null;


        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json() as FetchPokemonSpecies;
        const { name: pokemonNameJa } = extractJa(speciesData);

        const formResponse = await fetch(data.forms[0].url);
        const formData = await formResponse.json() as FetchPokemonForm;

        const formNameJa = formData.form_names?.find(
          (formName) =>
            formName.language.name === 'ja'
        );
        const formName = formNameJa?.name || "";

        const displayPokemonName = getDisplayPokemonName(data.id, pokemonNameJa, formName);

        return {
          id: pokemonId,
          baseFormId: data.id,
          name: displayPokemonName,
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
  const results = (await fetchBatch(pokemons)).filter(
    (pokemon) => pokemon !== null
  );
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
