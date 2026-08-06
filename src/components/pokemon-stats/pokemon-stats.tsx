import { Box, Typography, LinearProgress } from '@mui/material';

type Props = {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
};

const MAX_STAT = 255;

/**
 * このコンポーネントはポケモンのステータスを表示機能を提供する
 */
export default function PokemonStats({ stats }: Props) {
  const statList = [
    { label: 'HP', value: stats.hp },
    { label: 'こうげき', value: stats.attack },
    { label: 'ぼうぎょ', value: stats.defense },
    { label: 'とくこう', value: stats.specialAttack },
    { label: 'とくぼう', value: stats.specialDefense },
    { label: 'すばやさ', value: stats.speed },
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {statList.map((stat) => (
        <Box key={stat.label}>
          <Typography variant="h5">
            {stat.label}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: "5px", ml: "16px" }}>
            {stat.value}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(stat.value / MAX_STAT) * 100}
            sx={{
              flex: 1,
              width: 300,
              height: 10,
              borderRadius: 5,
              mt: "5px",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
