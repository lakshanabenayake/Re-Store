import NavBar from "./NavBar";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

function App() {
  const {darkMode} = useAppSelector(state => state.ui);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    },
      typography: {
    fontFamily: 'Gantari, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
  },
  })


  return (
<>
<ThemeProvider theme={theme}>
  <CssBaseline />
  <NavBar />
  <Box sx={{
    minHeight: '100vh',
    background: darkMode ? '#121212':'#eaeaea'
  }}>
     <Container maxWidth="xl" sx={{mt:14}}>
      
    <Outlet />
     </Container>
     </Box>
</ThemeProvider>
</>)
}

export default App
