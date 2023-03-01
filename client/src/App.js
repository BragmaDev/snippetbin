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
import PostListContainer from './components/PostListContainer';
import PostContainer from './components/PostContainer';
import PostEditForm from './components/PostEditForm';
import CommentEditForm from './components/CommentEditForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const darkTheme = createTheme({
		palette: {
		  mode: 'dark',
		  primary: purple,
		  lightgrey: "#9e9e9e"
		},
	});

	const [user, setUser] = useState(null);
	useEffect(() => {
        let mounted = true;
        // verifies that user is logged in
        async function verifyLogin() {
			const authToken = localStorage.getItem("auth_token");
            const res = await fetch("/api/users/verify", {
				headers: {"Authorization": "Bearer " + authToken},
				mode: "cors"
			})
                .then(response => response.json());
            if (mounted && res.verified) {
				setUser(res.user);
			}
			
        }
        verifyLogin();

        return () => { mounted = false; }
    }, []);
	  
	return (<>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
				<Router>
					<div className="App">
						<Header user={user}/>
						<Routes>
							<Route path="/" element={
								<Stack alignItems="center">
									<PostListContainer user={user}/>
								</Stack>}/>
							<Route path="/login" element={
								<ProtectedRoute user={user} shouldBeLoggedIn={false}>
									<LoginForm/>
								</ProtectedRoute>
							}/>
							<Route path="/register" element={
								<ProtectedRoute user={user} shouldBeLoggedIn={false}>
									<RegisterForm/>
								</ProtectedRoute>
							}/>
							<Route path="/posts/:postId" element={<PostContainer user={user}/>}/>
							<Route path="/posts/edit/:postId" element={
								<Stack alignItems="center">
									<PostEditForm user={user}/>
								</Stack>
							}/>
							<Route path="/comments/edit/:commentId" element={
								<Stack alignItems="center">
									<CommentEditForm user={user}/>
								</Stack>
							}/>
							<Route path="*" element={<h1>404</h1>}/>
						</Routes>		
					</div>
				</Router>
		</ThemeProvider>
		<ToastContainer theme="dark" position="top-center" />
		</>
	);
}

export default App;
