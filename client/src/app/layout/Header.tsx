import { AppBar, Toolbar, Typography } from "@mui/material"


export default function Header() {
    // Check Material UI Documantation
    // https://mui.com/components/app-bar/
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6'>
                    Re-Store
                </Typography>
            </Toolbar>
        </AppBar>
    )
}