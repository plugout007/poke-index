/**
 * [技術確認用] PokeAPIからポケモンのアイテムデータを取得するスクリプト
 */

import { NamedResource } from "../src/types/pokemon";

/**
 * 型： 技術検証のため今回はここに型を記述
 */

type ItemListResponse = {
  count: number;
  next: string;
  previous: string;
  results: NamedResource[];
}

type ItemResponse = {
  id: number;
  name: string;
  flavor_text_entries: FlavorTextEntry[]
  names: ItemName[]
  sprites: { default: string }
}

type FlavorTextEntry = {
  text: string;
  version_group: NamedResource;
  language: NamedResource;
}

type ItemName = {
  name: string;
  language: NamedResource;
}

// NOTE: アイテムIDには欠番があるため、IDを順番に取得せず一覧APIから全データを取得する
const fetchItems = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/item/?offset=0&limit=3000"
  );

  const data = await response.json() as ItemListResponse;
  return data.results;
}

const fetchBatch = async (items: NamedResource[]) => {
  const batchSize = 50;
  const results = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map(async (item) => {
        const response = await fetch(item.url);

        if (!response.ok) {
          throw new Error(`item fetch失敗: ${item.name}`);
        }

        const data = await response.json() as ItemResponse;

        const flavorText = data.flavor_text_entries
          .filter((entry: FlavorTextEntry) => entry.language.name === "ja")
          .at(-1)?.text?.replace(/\n/g, "　");

        return {
          id: data.id,
          name: data.name,
          nameJa:
            data.names.find(
              (name: ItemName) => name.language.name === "ja"
            )?.name ?? "不明",
          flavorText,
          imageUrl: data.sprites.default,
        };
      })
    );

    results.push(...batchResults);

    console.log(`${results.length}件取得`);
  }

  return results;
};

const main = async () => {
  const items = await fetchItems();

  const results = await fetchBatch(items);

  console.log(results);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});