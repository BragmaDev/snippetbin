import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

function LoginForm(props) {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({})

    const handleChange = (e) => {
        // update filled in credentials in variable
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
                    // add jwt to local storage
                    localStorage.setItem("auth_token", data.token);
                    toast.success("Logged in successfully");
                    props.setLogin(true);
                    navigate("/", { replace: true })
                } else {
                    toast.error("Login unsuccessful");
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