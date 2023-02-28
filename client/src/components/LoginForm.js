import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Stack, TextField, Button } from '@mui/material';

function LoginForm(props) {
    const [credentials, setCredentials] = useState({})

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.id]: e.target.value});     
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('api/users/login', {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(credentials),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => { 
                if (data.success === true && data.token) {
                    localStorage.setItem("auth_token", data.token);
                    window.location.reload();
                } else {
                    console.log("Login unsuccessful.");
                }
            });    
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <Stack alignItems="center" spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ pt: 4 }}>
                <TextField label="Email" id="email" variant="standard" />
                <TextField label="Password" id="password" type="password" variant="standard" />
                <Button type="submit" variant="contained">Log in</Button>
            </Stack>           
        </form>
    )
}

export default LoginForm