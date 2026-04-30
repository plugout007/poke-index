import {} from "./styled";
import { useState } from "react";
import { Box, Pagination, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { POKE_INDEX_ID_MAX } from "../../constants/pokemon";
import PokeCard from "./comonents/poke-card";
import pokemonJa from "../../data/pokemonJa.json";
import { normalizeText } from "../../utils/text";
/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const initLimit = 20; // 最大表示数

  const start = (page - 1) * initLimit;
  const end = start + initLimit;

  const polemonList = pokemonJa.map(p =>( {
    ...p,
    normalizedName: normalizeText(p.name),
  }));
  const normalizedSearch = normalizeText(search);

  const filtered = polemonList.filter(p => p.id <= POKE_INDEX_ID_MAX && p.normalizedName.includes(normalizedSearch));
  const displayList = filtered.slice(start, end);
  const totalPages = Math.ceil(filtered.length / initLimit);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value); // ページ番号の変更
  };

  return (
    <div>
      <h2>Pokémon List</h2>
      <Box sx={{ mt: "10px" }}>
        <TextField
          label="ポケモン名で検索"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 1,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: "10px",
          mt: "20px",
        }}
      >
      {displayList
        .filter(pokemon => pokemon.id <= POKE_INDEX_ID_MAX)
        .map(pokemon => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            style={{ textDecoration: "none" }}
          >
            <PokeCard pokemon={pokemon} />
          </Link>
        ))}
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
