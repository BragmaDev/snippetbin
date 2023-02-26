import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
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
                if (data.success === true) {
                    navigate("/");
                } else {
                    console.log("Login unsuccessful.");
                }
            });    
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" />
            </div>
            <button type="submit">Log in</button>
        </form>
    )
}

export default LoginForm