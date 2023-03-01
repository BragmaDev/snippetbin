import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

function RegisterForm() {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({});

	const handleChange = (e) => {
        // update filled in credentials in variable
        setCredentials({...credentials, [e.target.id]: e.target.value});     
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('api/users/register', {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(credentials),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => { 
                if (data.success === true) {
                    toast.success("User registered successfully");
					navigate("/login", { replace: true });
                } else {
                    toast.error(`Failed to register user: ${data.message}`);
                }
            });    
    }

	return (
		<form onChange={handleChange} onSubmit={handleSubmit}>
			<Stack alignItems="center" spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ pt: 4 }}>
				<TextField label="Username" id="username" variant="standard" />    
				<TextField label="Email" id="email" variant="standard" />
                <TextField label="Password" id="password" type="password" variant="standard" />
                <Button type="submit" variant="contained">Register</Button>
				<Typography color="gray">Username must be at least 3 characters long</Typography>
				<Typography color="gray">Email must be in the form of an address</Typography>
				<Typography color="gray">Password must be at least 5 characters long and have at 
				least 1 lower case letter, 1 upper case letter, and 1 number</Typography>
            </Stack> 
		</form>
	)
}

export default RegisterForm