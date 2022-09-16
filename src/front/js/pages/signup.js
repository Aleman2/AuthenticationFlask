import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const  {store, actions } = useContext(Context);
    const [ email, setEmail ] = useState(null);
    const [password, setPassword] = useState(null);
    let navigate = useNavigate();

    async function login(event) {
		event.preventDefault();
		const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password,
                is_active: true
			})
		});

		if (!response.ok) throw Error("There was a problem in the signup request");
		if (response.status === 400) {
			throw "Invalid email or password format";
		}
        
		const data = await response.json();

        navigate("/login");
        return data;
	}

	return (
		<div className="container">
			<h1>Sign Up</h1>
			<form onSubmit={login}>
				<div className="form-group">
					<input
						type="email"
						className="form-control"
						placeholder="email"
						onChange={(event) => setEmail(event.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="password"
						onChange={(event) => setPassword(event.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Regist
				</button>
			</form>
		</div>
	);
};
