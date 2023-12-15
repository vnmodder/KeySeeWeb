import { createTheme } from '@mui/material'

const appTheme = createTheme({
  palette: {
    primary: {
      light: '#AFEEEE',
      main: '#34c0e3',
      dark: '#049abf',
      contrastText: '#fff'
    },
    secondary: {
      light: '#FFB300',
      main: '#FFB300',
      dark: '#ba000d',
      contrastText: '#000'
    },
    white: {
      main: '#FFFFFF'
    }
  },
  typography: {
    h1: {
      fontSize: '52px',
      fontWeight: 700,
      lineHeight: '4.25rem'
    },
    h2: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '2.5rem'
    },
    h3: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '1.875rem'
    },
    h4: {
      fontSize: '18px',
      fontWeight: 'normal',
      lineHeight: '1.375rem'
    },
    body2: {
      fontSize: '14px',
      lineHeight: '22px'
    },
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(',')
  }
})

export { appTheme }
