import { ShoppingCart } from "@mui/icons-material"
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { Link, NavLink } from "react-router-dom"
//import { useStoreContext } from "../api/context/StoreContext"
import { useAppSelector } from "../store/configureStore"

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'}
]
const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
]

const navStyles = {
    color: 'inherit', 
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({darkMode, handleThemeChange}: Props) {
    // Check Material UI Documantation
    // https://mui.com/components/app-bar/

    //const {basket} = useStoreContext();
    const {basket} = useAppSelector(state => state.basket);

    // Video: "Updating the header with the basket item count" 3:35 min
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        // Mat UI sx:  https://mui.com/system/the-sx-prop/#main-content
        // Material UI spacing: https://mui.com/system/the-sx-prop/#spacing
        // The `sx` prop is a shortcut for defining custom style that has access to the theme
        // mb is margin buttom
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {/* The Box component serves as a wrapper component for most of the CSS utility needs. */}
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6' component={NavLink} to='/' exact sx={navStyles}>
                        Re-Store
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>

                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                
                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' sx={{color: 'inherit'}}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                    {/* display: 'flex' set horizontal direction by default */}
                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}