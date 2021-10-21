import { AppBar, Toolbar, Typography } from "@mui/material"


export default function Header() {
    // Check Material UI Documantation
    // https://mui.com/components/app-bar/
    return (
        // Mat UI sx:  https://mui.com/system/the-sx-prop/#main-content
        // Material UI spacing: https://mui.com/system/the-sx-prop/#spacing
        // The `sx` prop is a shortcut for defining custom style that has access to the theme
        // mb is margin buttom
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>
                    Re-Store
                </Typography>
            </Toolbar>
        </AppBar>
    )
}