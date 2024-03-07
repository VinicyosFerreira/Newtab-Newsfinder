import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './components/LoginForm';

export default function App() {
	return (
		<div>
			<h1>Meu Aplicativo</h1>
			<LoginForm />
		</div>
	);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);