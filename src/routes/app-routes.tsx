import { useRoutes } from 'react-router-dom';
import Layout from '../components/layout';
import { routes } from '../config/routes-config';
import NotFound from '../features/not-found';
import Home from '../features/home';
import PokemonPage from '../features/pokemon-page';

/**
 * このコンポーネントはルートを定義する
 */
// useRoutes を使用する。
const AppRoutes = () => {

  const routesConfig = [
    { ...routes.home, element: <Home /> },
    { ...routes.pokemon, element: <PokemonPage /> },
    // { ...routes.forgotPassword, element: <ForgotPassword /> },
    // { ...routes.resetPassword, element: <ResetPassword /> },
    // { ...routes.mypage, element: <Mypage /> },
    // { ...routes.levels, element: <Levels /> },
    // { ...routes.video, element: <Video /> },
    // { ...routes.practice, element: <Practice /> },
    { path: '/*', element: <NotFound /> },
  ];

  const element = useRoutes(routesConfig);

  return <Layout>{element}</Layout>;
}

export default AppRoutes