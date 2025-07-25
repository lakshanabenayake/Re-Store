import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

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

export default function NavBar({darkMode,toggleMode}:Props) {
    // const [darkMode,setdarkMode] = useState(false);
    // const changeMode = ()=>{
    //   setdarkMode(darkMode=> darkMode = !darkMode)
    // };

  return (
    <AppBar position="fixed">
        <Toolbar>
            <Typography component={NavLink} to={'/'} variant="h4">RE-STORE</Typography>
            <IconButton onClick={toggleMode}>
              {darkMode ? <DarkMode /> : <LightMode sx={{color:'white'}} />}
            </IconButton>
            <List sx={{display:'flex'}}>
            {midLinks.map(({title,path}) => (
            <ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={{color:'inherit',typography:'h6'}} 
            >
              {title.toUpperCase()}

            </ListItem>
            ))}
            </List>

            <IconButton size="large">
              <Badge badgeContent={4} color="secondary" />
                <ShoppingCart />
            </IconButton>

            <List sx={{display:'flex'}}>
            {rightLinks.map(({title,path}) => (
            <ListItem
            component={NavLink}
            to={path}
            key={path}
            sx={{color:'inherit',typography:'h6'}} 
            >
              {title.toUpperCase()}

            </ListItem>
            ))}
            </List>
        </Toolbar>
    </AppBar>
  )
}
