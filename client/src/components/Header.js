import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header(props) {
    let userButtons = <>
        <Button component={Link} to="/login" variant="text" color="secondary">LOGIN</Button>
        <Button component={Link} to="/register" variant="text" color="secondary">REGISTER</Button>
    </>

    const handleLogout = (e) => {
        localStorage.removeItem("auth_token");
        window.location.reload();
    }

    if (props.loggedIn) {
        userButtons = <Button onClick={handleLogout} variant="text" color="secondary">LOGOUT</Button>
    } 

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    &lt;SNIPPETBIN/&gt;
                </Typography>
                <Grid container justifyContent="end">
                    {userButtons}
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header