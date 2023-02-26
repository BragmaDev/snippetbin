import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PostForm from './components/PostForm';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<PostForm/>}/>
					<Route path="/login" element={<LoginForm/>}/>
					<Route path="/register" element={<RegisterForm/>}/>
					<Route path="*" element={<h1>404</h1>}/>
				</Routes>
			</Router>		
    	</div>
	);
}

export default App;
