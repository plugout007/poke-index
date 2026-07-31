import {} from "./styled";
import { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Pagination, TextField, Typography } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Link } from "react-router-dom";
import { POKE_INDEX_ID_MAX } from "../../constants/pokemon";
import PokeCard from "./comonents/poke-card";
import pokemonJa from "../../data/pokemonJa.json";
import { normalizeText } from "../../utils/text";
import TypeSelector from "./comonents/type-selector";
/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isOnlySingleType, setIsOnlySingleType] = useState<boolean>(false);

  useEffect(() => {
    setPage(1); // 検索や選択されたタイプが変わったらページをリセット
  }, [search, selectedTypes]);

  const initLimit = 20; // 最大表示数

  const start = (page - 1) * initLimit;
  const end = start + initLimit;

  const polemonList = pokemonJa.map(p =>( {
    ...p,
    normalizedName: normalizeText(p.name),
  }));
  const normalizedSearch = normalizeText(search);

  const filtered = polemonList.filter(p => {
    const matchesSearch = p.normalizedName.includes(normalizedSearch);

    const matchesTypes =
      selectedTypes.length === 0 ||
      selectedTypes.every(type => p.types.includes(type));

    const matchesSingleType = !isOnlySingleType || p.types.length === 1;

    return (
      p.id <= POKE_INDEX_ID_MAX &&
      matchesSearch &&
      matchesTypes &&
      matchesSingleType
    );
  });
  const displayList = filtered.slice(start, end);
  const totalPages = Math.ceil(filtered.length / initLimit);

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value); // ページ番号の変更
  };

  // 検索条件を解除
  const handleResetSearchConditions = () => {
    setSearch('');
    setSelectedTypes([]);
    setIsOnlySingleType(false);
  };

  return (
    <Box sx={{ my: '40px' }}>
      <Box sx={{
        p: '20px',
        bgcolor: '#fff',
        borderRadius: '5px',
        border: '2px solid #bbb',
      }}>
        <Typography variant="h2">Pokémon Search</Typography>
        <Box sx={{ mt: "20px" }}>
          <TextField
            label="ポケモン名で検索"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: "300px",
              backgroundColor: "background.paper",
              borderRadius: 1,
            }}
          />
        </Box>
        <Box sx={{ mt: "15px" }}>
          <TypeSelector selected={selectedTypes} setSelected={setSelectedTypes} isOnlySingleType={isOnlySingleType}/>
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={isOnlySingleType}
              onChange={(e) => setIsOnlySingleType(e.target.checked)}
              disabled={selectedTypes.length >= 2}
            />
          }
          label="単タイプのみ"
        />
        <Box sx={{ mt: "15px" }}>
          <Button
            startIcon={<RestartAltIcon />}
            onClick={handleResetSearchConditions}
            variant="outlined"
            color="inherit"
            sx={{
              borderWidth: 1,
              borderColor: '#bbb',
              bgcolor: '#fff',
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'grey.100',
                borderColor: 'grey.500',
              },
            }}
          >
            検索条件を解除する
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          mt: "30px",
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
          mb: "30px",
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
    </Box>
  );
}
