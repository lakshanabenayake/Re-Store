import {  useState } from "react";
import NavBar from "./NavBar";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";





function App() {
  

  const [darkMode,setdarkMode] = useState(true);
  const toggleMode = ()=>{
    setdarkMode(darkMode=> darkMode = !darkMode)
  };

  const palleteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })
  // const addProduct = () => {
  //   setProducts(prevState => [...prevState,
  //     {
        
  //         id: prevState.length + 1,
  //         name: `product ${prevState.length + 1}`,
  //         description: 'test',
  //         price: (prevState.length*100)+100,
  //         pictureUrl: 'https://picsum.photos/200/300',
  //         type: 'test',
  //         brand: 'test',
  //         quantityInStock: 100
  //     }])
  // }




  return (
<>
<ThemeProvider theme={theme}>
  <CssBaseline />
  <NavBar toggleMode={toggleMode} darkMode ={darkMode} />
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
