import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthContextProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
        main: '#92817a',
    },
    secondary: {
        main: '#f1dabf',
    },
    info: {
        main: '#362417',
    },
    common: {
        black: '#04030f',
    },
    text: {
        primary: '#04030f',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AuthContextProvider>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </React.StrictMode>
    </AuthContextProvider>
)
