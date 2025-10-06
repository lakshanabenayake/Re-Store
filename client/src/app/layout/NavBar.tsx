import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";

const midLinks =[
  {title:'catalog',path:'/catalog'},
  {title:'about',path:'/about'},
  {title:'contact',path:'/contact'}
]

const rightLinks =[
  {title:'login',path:'/login'},
  {title:'register',path:'/register'}
]
type Props ={
  toggleMode : ()=> void;
  darkMode: boolean;
}
const Navstyles = {color:'inherit',typography:'h6',textDecoration:'none',
              '&:hover': {
                color: 'gray.500',
              },
              '&.active': {
                color: 'secondary.main',
              }
            }
export default function NavBar({darkMode,toggleMode}:Props) {
    // const [darkMode,setdarkMode] = useState(false);
    // const changeMode = ()=>{
    //   setdarkMode(darkMode=> darkMode = !darkMode)
    // };
    const {isLoading} = useAppSelector(state => state.ui);


  return (
    
    <AppBar position="fixed">
        <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Box sx={{display:'flex',alignItems:'center'}}>
            <Typography component={NavLink} to={'/'} sx={Navstyles} variant="h4">RE-STORE</Typography>
            <IconButton onClick={toggleMode}>
              {darkMode ? <DarkMode /> : <LightMode sx={{color:'white'}} />}
            </IconButton>
          </Box>
            <List sx={{display:'flex'}}>
            {midLinks.map(({title,path}) => (
            <ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={Navstyles} 
            >
              {title.toUpperCase()}

            </ListItem>
            ))}
            </List>


            <Box sx={{display:'flex',alignItems:'center'}}>
            <IconButton size="large">
              <Badge badgeContent={"4"}  color="secondary" >
                <ShoppingCart />
              </Badge>
            </IconButton>

            <List sx={{display:'flex'}}>
            {rightLinks.map(({title,path}) => (
            <ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={Navstyles} 
            >
              {title.toUpperCase()}

            </ListItem>
            ))}
            </List>
          </Box>
        </Toolbar>
        <Box width={'100%'} position='absolute' top='100%'>
           {isLoading && <LinearProgress color="secondary" sx={{position:'absolute',bottom:0,left:0,right:0}} />}
        </Box>
       
    </AppBar>
  )
}
