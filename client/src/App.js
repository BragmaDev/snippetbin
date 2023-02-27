import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';
import PostListContainer from './components/PostListContainer';
import PostContainer from './components/PostContainer';

function App() {
	return (
		<Router>
			<div className="App">
				<Header/>
				<Routes>
					<Route path="/" element={<>
						<PostForm/>
						<PostListContainer/>
					</>}/>
					<Route path="/login" element={<LoginForm/>}/>
					<Route path="/register" element={<RegisterForm/>}/>
					<Route path="/posts/:postId" element={<PostContainer/>}/>
					<Route path="*" element={<h1>404</h1>}/>
				</Routes>		
    		</div>
		</Router>
	);
}

export default App;
