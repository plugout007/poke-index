export const getPokemonImageUrl = (id: number) => {
  // メガジガルデの画像が取得できないのでポケモンホームの画像を取得する
  if(id === 10301 ) return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10301.png"
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
};