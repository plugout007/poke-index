import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { ReactNode } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ja } from 'date-fns/locale/ja';
import { BrowserRouter } from "react-router-dom";
import customTheme from '../config/theme-config';
import store from '../stores/store'


type AppProviderProps = {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  // eslint-disable-next-line
  const jaLocale: any = ja;
  return (
    <>
      <CssBaseline />
      <ReduxProvider store={store}>
        <ThemeProvider theme={customTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={jaLocale}>
            <BrowserRouter>{children}</BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  )
}

export default AppProvider