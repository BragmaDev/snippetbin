import React from 'react';
import { Stack, TextField, Button } from '@mui/material';

function RegisterForm() {
	return (
		<form>
			<Stack alignItems="center" spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ pt: 4 }}>
				<TextField label="Username" id="username" variant="standard" />    
				<TextField label="Email" id="email" variant="standard" />
                <TextField label="Password" id="password" type="password" variant="standard" />
                <Button type="submit" variant="contained">Register</Button>
            </Stack> 
		</form>
	)
}

export default RegisterForm