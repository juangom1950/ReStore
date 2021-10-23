import { AppBar, Switch, Toolbar, Typography } from "@mui/material"

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

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
                <Typography variant='h6'>
                    Re-Store
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange} />
            </Toolbar>
        </AppBar>
    )
}