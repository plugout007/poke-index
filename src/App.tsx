// Provider と Routes を分けて作る
import AppProvider from './providers/app-provider';
import AppRoutes from './routes/app-routes';
const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
