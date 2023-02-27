import './App.css';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Stack from '@mui/material/Stack';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';
import PostListContainer from './components/PostListContainer';
import PostContainer from './components/PostContainer';

function App() {
	const darkTheme = createTheme({
		palette: {
		  mode: 'dark',
		  primary: purple
		},
	});

	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
        let mounted = true;
        // verifies that user is logged in
        async function verifyLoggedIn() {
			let verified = false;
			const authToken = localStorage.getItem("auth_token");
            await fetch("/api/users/verify", {
				headers: {
				"Authorization": "Bearer " + authToken
				},
				mode: "cors"
			})
                .then(response => response.json())
				.then(json => { if (json.verified) verified = true });

            if (mounted) setLoggedIn(verified);
			
        }
        verifyLoggedIn();

        return () => { mounted = false; }
    }, []);
	  
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
				<Router>
					<div className="App">
						<Header loggedIn={loggedIn}/>
						<Routes>
							<Route path="/" element={<Stack 
								alignItems="center"
							>
								<PostForm loggedIn={loggedIn}/>
								<PostListContainer/>
							</Stack>}/>
							<Route path="/login" element={
								<ProtectedRoute loggedIn={loggedIn} shouldBeLoggedIn={false}>
									<LoginForm/>
								</ProtectedRoute>
							}/>
							<Route path="/register" element={
								<ProtectedRoute loggedIn={loggedIn} shouldBeLoggedIn={false}>
									<RegisterForm/>
								</ProtectedRoute>
							}/>
							<Route path="/posts/:postId" element={<PostContainer/>}/>
							<Route path="*" element={<h1>404</h1>}/>
						</Routes>		
					</div>
				</Router>
		</ThemeProvider>
		
	);
}

export default App;
