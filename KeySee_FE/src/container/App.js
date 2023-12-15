import './App.css'
import { ThemeProvider } from '@mui/material'
import AppRouter from 'src/routes/AppRouter'
import { appTheme } from 'src/common/appTheme'

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
