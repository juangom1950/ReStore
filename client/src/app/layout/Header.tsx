import { ShoppingCart } from "@mui/icons-material"
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"

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

export default function Header({darkMode, handleThemeChange}: Props) {
    // Check Material UI Documantation
    // https://mui.com/components/app-bar/
    return (
        // Mat UI sx:  https://mui.com/system/the-sx-prop/#main-content
        // Material UI spacing: https://mui.com/system/the-sx-prop/#spacing
        // The `sx` prop is a shortcut for defining custom style that has access to the theme
        // mb is margin buttom
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6' component={NavLink} to='/' sx={{color: 'inherit', textDecoration: 'none'}}>
                    Re-Store
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} />
                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{color: 'inherit', typography: 'h6'}}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <IconButton size='large' sx={{color: 'inherit'}}>
                    <Badge badgeContent={4} color='secondary'>
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
                            sx={{color: 'inherit', typography: 'h6'}}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
            </Toolbar>
        </AppBar>
    )
}