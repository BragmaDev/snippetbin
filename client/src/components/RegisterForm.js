import React from 'react'

function RegisterForm() {
	return (
		<form>
			<div>
				<label htmlFor="username">Username</label>
				<input id="username" type="text" />
				<label htmlFor="email">Email</label>
				<input id="email" type="text" />
				<label htmlFor="password">Password</label>
				<input id="password" type="password" />
			</div>
			<button type="submit">Register</button>
		</form>
	)
}

export default RegisterForm