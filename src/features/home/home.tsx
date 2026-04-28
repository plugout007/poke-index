import {} from "./styled";
import { useEffect, useState } from "react";
import { fetchPokemonList } from "../../api/pokeApi";
import { PokemonListResponse } from "../../types/pokemon";
import { Box, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { POKE_INDEX_ID_MAX } from "../../constants/pokemon";
import PokeCard from "./comonents/poke-card";
import { API_BASE_URL } from "../../config/api-config";
/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function Home() {
  const [pokemonList, setPokemonList] = useState<
    PokemonListResponse["results"]
  >([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const initOffset = 0; // 開始No - 1
  const initLimit = 20; // 最大表示数
  const buildPokemonListUrl = (offset: number, limit: number): string => {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });
    return `${API_BASE_URL}/pokemon?${params.toString()}`;
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const url = buildPokemonListUrl(
          initOffset + (page - 1) * initLimit,
          initLimit
        );
        const data = await fetchPokemonList(url);
        setPokemonList(data.results);
        setTotalPages(Math.ceil(POKE_INDEX_ID_MAX / initLimit));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemon();
  }, [page]);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value); // ページ番号の変更
  };

  return (
    <div>
      <h1>Pokémon List</h1>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: "10px",
        }}
      >
        {pokemonList.map((pokemon) => {
          if (pokemon.id <= POKE_INDEX_ID_MAX) {
            return (
              <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none' }}>
                <PokeCard pokemon={pokemon} />
              </Link>
            );
          }
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          columnGap: "20px",
          justifyContent: "center",
          mt: "15px",
        }}
      >
        <Pagination
          count={totalPages} // 総ページ数
          page={page} // 現在のページ
          onChange={handlePageChange} // ページ変更のハンドラー
          color="primary" // 色
          shape="rounded" // 丸みを帯びた形
          sx={{ mt: 2 }} // 上に余白を追加
          />
      </Box>
    </div>
  );
}
