import { useState } from 'react';
import { Navigate } from 'react-router-dom';

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

    if (props.loggedIn) {
        return <Navigate to="/" replace />;
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