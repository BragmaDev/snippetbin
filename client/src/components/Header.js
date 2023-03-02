import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const navigate = useNavigate();
    let userButtons = <>
        <Button component={Link} to="/login" variant="text" color="secondary">LOGIN</Button>
        <Button component={Link} to="/register" variant="text" color="secondary">REGISTER</Button>
    </>

    const handleLogout = (e) => {
        // remove jwt from local storage
        localStorage.removeItem("auth_token");
        props.setLogin(false);
        navigate("/", { replace: true });
        window.location.reload();
    }

    if (props.user != null) {
        // change login and register buttons to logout if user is logged in
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
                    <Typography 
                        sx={{ my: 1, pr: 3 }}
                        variant="button" 
                        color="lightgrey"
                    >
                        {(props.user != null) ? "Hello " + props.user.username + "!" : ""}
                    </Typography>
                    {userButtons}
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header