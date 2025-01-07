import {} from "./styled";
import { useEffect, useState } from "react";
import PokeCard from "../../components/poke-card";
import { fetchPokemonList } from "../../api/pokeApi";
import { PokemonListResponse } from "../../types/pokemon";
import { API_BASE_URL, POKE_INDEX_ID_MAX } from "../../utils/commonData";
import { Box, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
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
        console.log(data);
        setPokemonList(data.results);
        setTotalPages(Math.ceil(POKE_INDEX_ID_MAX / initLimit));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemon();
  }, [page]);

  // const handlePokemonClick = async (id: number) => {
  //   try {
  //     const details = await getPokemon(id);
  //     setSelectedPokemon(details);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
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
