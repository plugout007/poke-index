import { typeData } from "../constants/pokemon";
import pokemonTypeChart from "../data/pokemonTypeChart.json";
import { PokemonTypeName } from "../types/pokemon";

const pokemonTypeChartJson =
  pokemonTypeChart as Record<
    PokemonTypeName,
    Partial<Record<PokemonTypeName, number>>
  >;

type TypeEffectiveness = {
  type: PokemonTypeName;
  multiplier: number;
};

export const calcTypeMultiplier = (
  defenseTypes: PokemonTypeName[],
): TypeEffectiveness[] => {
  const allTypes = Object.keys(typeData) as PokemonTypeName[];

  return allTypes
    .map((attackType) => {
      const multiplier = defenseTypes.reduce(
        (total, defenseType) =>
          total * (pokemonTypeChartJson[defenseType]?.[attackType] ?? 1),
        1
      );

      return {
        type: attackType,
        multiplier,
      };
    })
    .filter(({ multiplier }) => multiplier !== 1)
    .sort((a, b) => b.multiplier - a.multiplier);
};