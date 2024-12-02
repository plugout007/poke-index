// 各画面の url とタイトルを定義
export const routes = {
  home: { path: '/' },
  forgotPassword: { path: '/forgotPassword' },
  resetPassword: { path: '/resetPassword' },
  mypage: { path: '/mypage', menuLabel: 'マイページ', title: 'マイページ' },
  levels: { path: '/levels', menuLabel: 'レベル', title: 'レベル' },
  video: { path: '/video/:videoId', menuLabel: '動画', title: '動画' },
  practice: { path: '/practice/:practiceId', menuLabel: '練習問題', title: '練習問題' },
};